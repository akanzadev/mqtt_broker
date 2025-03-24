import { Document, model, Schema } from "mongoose";

export interface IMetric extends Document {
  deviceId: Schema.Types.ObjectId; // ID del dispositivo asociado
  metricType: string; // tipo de métrica (temperatura, humedad, etc.)
  value: number; // valor de la métrica
  timestamp: Date; // momento en que se registró la métrica
}

const MetricSchema = new Schema<IMetric>({
  deviceId: {
    type: Schema.Types.ObjectId,
    ref: "Device",
    required: true,
  },
  metricType: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const MetricModel = model<IMetric>("Metric", MetricSchema);
