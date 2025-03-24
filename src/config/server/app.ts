import express, { Application } from "express";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import http from "http";
import path from "path";

import Sockets from "../sockets/sockets";
import { MqttHandler } from "../mqtt/mqtt_handler";
import Connection from "../database/connection";
import { metricRoutes } from "../../metric/metric.routes";
import {
  MetricRepositoryImpl,
  MetricServiceImpl,
} from "../../metric/metric.service";
import { deviceRoutes } from "../../device/device.routes";

class App {
  public app: Application;
  public io: SocketIOServer;
  private server: http.Server;
  private sockets!: Sockets;
  private mqttHandler!: MqttHandler;
  private connection!: Connection;

  private port = process.env.PORT || 3000;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new SocketIOServer(this.server);

    this.startDatabase();

    this.middlewares();

    this.routes();

    this.startSockets();

    this.startMqtt();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.static(path.join(__dirname, "../../../public")));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    metricRoutes(this.app);
    deviceRoutes(this.app);

    this.app.post("/publish-mqtt", (req, res): void => {
      try {
        this.mqttHandler.publishMessage({ ...req.body });
        res.status(200).json({
          ok: true,
        });
      } catch (error: any) {
        res.status(500).json({
          ok: false,
          message: "Error sending message to mqtt",
          error: error.message || error,
        });
      }
    });

    this.app.get("/disconnect-mqtt", (req, res): void => {
      try {
        this.mqttHandler.disconnect();
        res.status(200).send("Disconnected from mqtt");
      } catch (error) {
        res.status(500).send(error);
      }
    });
  }

  private startMqtt(): void {
    const metricRepository = new MetricRepositoryImpl(); // Crea una instancia de tu repositorio
    const metricService = new MetricServiceImpl(metricRepository); // Crea una instancia de tu servicio
    this.mqttHandler = new MqttHandler(this.sockets, metricService); // Pasa el servicio al handler
    this.mqttHandler.connect();
  }

  private startSockets(): Sockets {
    this.sockets = new Sockets(this.io);
    return this.sockets;
  }

  private startDatabase(): void {
    this.connection = Connection.getInstance();
    this.connection.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/broker"
    );
  }

  public listen(): void {
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

export default App;
