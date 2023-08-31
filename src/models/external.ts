import { Schema, model } from 'mongoose'
import { IExternal } from '../interface/external'

const ExternalSchema: Schema = new Schema<IExternal>(
  {
    no: { type: String, required: true },
    date: { type: String, required: true },
    about: { type: String, required: true },
    uri: { type: String, required: true },
    read: { type: String, required: true, default: 'Belum Dibaca' },
    sender: { type: String, required: true },
    destination: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export const External = model<IExternal>('External', ExternalSchema)
