import { Schema, model } from 'mongoose'
import { IMasuk } from '../interface/masuk'

const MasukSchema: Schema = new Schema<IMasuk>(
  {
    no: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    about: { type: String, required: true },
    uri: { type: String, required: true },
    owner: { type: String, required: true },
    // read: { type: String, required: true, default: 'Dibaca' },
  },
  {
    timestamps: true,
  }
)

export const Masuk = model<IMasuk>('Masuk', MasukSchema)
