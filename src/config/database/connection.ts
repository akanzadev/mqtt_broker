import mongoose, { ConnectOptions } from "mongoose";

class Connection {
  private static instance: Connection;
  private connection: mongoose.Connection;

  private constructor() {
    this.connection = mongoose.connection;
  }

  public static getInstance(): Connection {
    if (!Connection.instance) {
      Connection.instance = new Connection();
    }

    return Connection.instance;
  }

  public async connect(uri: string, options?: ConnectOptions): Promise<void> {
    await mongoose.connect(uri, options);
  }

  public async disconnect(): Promise<void> {
    await this.connection.close();
  }
}

export default Connection;
