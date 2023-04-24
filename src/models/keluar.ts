import { Schema, model } from 'mongoose'
import { IKeluar } from '../interface/keluar'

const KeluarSchema: Schema = new Schema<IKeluar>(
  {
    no: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    about: { type: String, required: true },
    uri: { type: String, required: true },
    sender: { type: String, required: true },
    read: { type: String, required: true, default: 'Dibaca' },
  },
  {
    timestamps: true,
  }
)

export const Keluar = model<IKeluar>('Keluar', KeluarSchema)
