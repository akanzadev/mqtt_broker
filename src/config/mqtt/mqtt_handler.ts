import mqtt, { MqttClient } from "mqtt";

import Sockets from "../sockets/sockets"; // Asegúrate de importar la clase Sockets
import {
  MetricServiceImpl,
  MetricRepositoryImpl,
} from "../../metric/metric.service";
import { MetricModel } from "../../metric/metric.model";

export class MqttHandler {
  mqttClient!: MqttClient;
  protocol: string = process.env.MQTT_PROTOCOL || "mqtts";
  host: string = process.env.MQTT_HOST || "l7971d94.ala.us-east-1.emqxsl.com";
  username: string = process.env.MQTT_USERNAME || "akanza"; // mqtt credentials if these are needed to connect
  password: string = process.env.MQTT_PASSWORD || "akanza"; // mqtt credentials if these are needed to connect
  port: number = parseInt(process.env.MQTT_PORT || "8883");
  clienteId: string = `mqtt_${Math.random().toString(16).slice(3)}`;
  url: string = `${this.protocol}://${this.host}:${this.port}`;
  sockets!: Sockets;
  metricService!: MetricServiceImpl;

  constructor(sockets: Sockets, metricService: MetricServiceImpl) {
    this.sockets = sockets;
    this.metricService = metricService;
  }

  connect(): void {
    // * Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    this.mqttClient = mqtt.connect(this.url, {
      clientId: this.clienteId,
      clean: true,
      connectTimeout: 4000,
      username: this.username,
      password: this.password,
      reconnectPeriod: 1000,
    });

    // * Mqtt error calback
    this.mqttClient.on("error", (err) => {
      console.log(
        "🚀 ~ file: mqtt_handler.ts:26 ~ MqttHandler ~ this.mqttClient.on ~ err:",
        err
      );
      this.mqttClient.end();
    });

    // * Connection callback
    this.mqttClient.on("connect", () => {
      console.log(`mqtt client connected`);
    });

    // * mqtt subscriptions
    this.mqttClient.subscribe("Output/01", { qos: 0 });
    this.mqttClient.subscribe("Input/01", { qos: 0 });

    // * When a message arrives, console.log it
    this.mqttClient.on("message", async (topic, buffer) => {
      const body = JSON.parse(buffer.toString());

      const timestamp = body.timestamp;
      const deviceStartTime = Date.now() - timestamp;
      const date = new Date(deviceStartTime);

      try {
        const metric = new MetricModel({
          deviceId: body.deviceId,
          metricType: body.metricType,
          value: body.value,
          timestamp: date,
        });

        const newMetric = await this.metricService.createMetric(metric);
        const rta = await newMetric.populate("deviceId");

        // Emitimos el mensaje recibido por MQTT a todos los clientes conectados vía Socket.IO
        this.sockets.emitMessageToClients(
          metric.metricType,
          topic,
          JSON.stringify(rta)
        );
      } catch (error) {
        console.error("Error al crear la métrica:", error);
      }
    });

    // * When the client disconnects
    this.mqttClient.on("close", () => {
      console.log(`mqtt client disconnected`);
    });
  }

  disconnect(): void {
    if (!this.mqttClient) {
      throw new Error("Mqtt client is not connected");
    }

    this.mqttClient.end();
  }

  publishMessage({ topic, message }: { topic: string; message: string }): void {
    if (!this.mqttClient.connected) {
      throw new Error("Mqtt client is not connected");
    }

    this.mqttClient.publish(topic, JSON.stringify(message));
  }
}
