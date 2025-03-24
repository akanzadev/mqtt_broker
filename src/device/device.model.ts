import { Document, model, Schema } from "mongoose";

export interface IDevice extends Document {
  deviceId: string; // ID único del dispositivo
  type: string; // tipo de dispositivo
  location: string; // ubicación del dispositivo
  status: string; // estado del dispositivo
  lastCommunication: Date; // última comunicación del dispositivo
}

const DeviceSchema = new Schema<IDevice>({
  deviceId: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "active",
  },
  lastCommunication: {
    type: Date,
    default: Date.now,
  },
});

export const DeviceModel = model<IDevice>("Device", DeviceSchema);
