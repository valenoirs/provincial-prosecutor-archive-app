import { Schema, model } from 'mongoose'
import { IKeyword } from '../interface/keyword'

const KeywordSchema: Schema = new Schema<IKeyword>({
  type: { type: String, required: true, unique: true },
  keyword: { type: String, required: true },
})

export const Keyword = model<IKeyword>('Keyword', KeywordSchema)
