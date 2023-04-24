import { model, Schema } from 'mongoose'
import { IUser } from '../interface/user'

const UserSchema: Schema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    lastLogin: { type: Date, required: true, default: Date.now() },
  },
  {
    timestamps: true,
  }
)

export const User = model<IUser>('User', UserSchema)
