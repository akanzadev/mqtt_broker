#include <WiFiClientSecure.h>
#include <WiFi.h>
#include <PubSubClient.h>

WiFiClientSecure esp32Client;
PubSubClient mqttClient(esp32Client);

const char *ssid = "wifi_user2GHz";
const char *password = "wifi_password";

char *server = "example.ex.us-east-1.emqxsl.com";
int port = 8883;
const char *mqttUser = "username";
const char *mqttPassword = "password";

const char *ca_cert =
    "-----BEGIN CERTIFICATE-----\n"
    "CERTIFICATE_tESTASDASDASFDSFSDFDSF\n"
    "-----END CERTIFICATE-----\n";

int ledPin = 26;
int photoPin = 33;

int var = 0;
int ledValue = 0;
int photoValue = 0;
char data[100];
String resultStr = "";

void wifiInit()
{
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(500);
    }
    Serial.println("");
    Serial.println("Connected to WiFi");
    Serial.println("IP Address: ");
    Serial.println(WiFi.localIP());
}

void callback(char *topic, byte *payload, unsigned int length)
{
    Serial.print("Message received [");
    Serial.print(topic);
    Serial.print("] ");

    char payload_string[length + 1];

    int resultInt;

    memcpy(payload_string, payload, length);
    payload_string[length] = '\0';
    resultInt = atoi(payload_string);

    var = resultInt;

    resultStr = "";

    for (int i = 0; i < length; i++)
    {
        resultStr = resultStr + (char)payload[i];
    }
    Serial.println();
}

void reconnect()
{
    while (!mqttClient.connected())
    {
        Serial.print("Attempting MQTT connection...");

        if (mqttClient.connect("arduinoClient", mqttUser, mqttPassword))
        {
            Serial.println("Connected");

            mqttClient.subscribe("Input/01");
        }
        else
        {
            Serial.print("Failed, rc=");
            Serial.print(mqttClient.state());
            Serial.println(" try again in 5 seconds");
            delay(5000);
        }
    }
}

void setup()
{
    pinMode(ledPin, OUTPUT);
    Serial.begin(115200);
    delay(10);
    wifiInit();

    esp32Client.setCACert(ca_cert);

    mqttClient.setServer(server, port);
    mqttClient.setCallback(callback);
}

void loop()
{
    Serial.println("ESP32 funcionando...");
    if (!mqttClient.connected())
    {
        reconnect();
    }
    mqttClient.loop();

    Serial.print("String: ");
    Serial.println(resultStr);

    if (var == 0)
    {
        digitalWrite(ledPin, LOW);
    }
    else if (var == 1)
    {
        digitalWrite(ledPin, HIGH);
    }

    photoValue = analogRead(photoPin);
    Serial.print("Photoresistor: ");
    Serial.println(photoValue);

    String timestamp = String(millis());
    sprintf(data, "{\"deviceId\": \"613f4b3b7f4b3b001f4b3b00\", \"metricType\": \"photoresistor\", \"value\": %d, \"timestamp\": \"%s\"}", photoValue, timestamp.c_str());

    mqttClient.publish("Output/01", data);
    delay(1000);
}