# C3M Broker

A real-time data broker system built with TypeScript, MQTT, and Socket.IO for efficient device communication and metric monitoring.

## 🌟 Features

- Real-time MQTT communication
- WebSocket support for client connections
- Metric collection and storage
- Device monitoring and management
- Secure MQTT connections with TLS support
- Automatic reconnection handling

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MQTT broker (EMQX is supported)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/c3m_broker.git
cd c3m_broker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory with the following variables:
```env
MQTT_PROTOCOL=mqtts
MQTT_HOST=your-mqtt-host
MQTT_USERNAME=your-username
MQTT_PASSWORD=your-password
MQTT_PORT=8883
```

### Running the Application

```bash
# Development mode
npm run dev
# or
yarn dev

# Production mode
npm run build
npm start
# or
yarn build
yarn start
```

## 📡 MQTT Topics

The broker subscribes to the following topics:
- `Output/01`: For receiving device output data
- `Input/01`: For receiving device input data

## 🔧 Architecture

The project follows a clean architecture pattern with the following main components:

- **MQTT Handler**: Manages MQTT connections and message handling
- **Socket Service**: Handles real-time WebSocket communications
- **Metric Service**: Manages metric collection and storage
- **Device Management**: Handles device registration and monitoring

## 🛠️ Built With

- TypeScript
- MQTT.js
- Socket.IO
- Node.js
- Express (if applicable)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Made with ❤️ by Akanza