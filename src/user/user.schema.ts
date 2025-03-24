import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  userId: string; // ID único del usuario
  name: string; // nombre del usuario
  email: string; // correo electrónico del usuario
  role: string; // rol del usuario
  devices: string[]; // lista de dispositivos asociados
}

const UserSchema = new Schema<IUser>({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  devices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Device",
    },
  ],
});

export const UserModel = model<IUser>("User", UserSchema);
