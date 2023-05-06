import WhichX from 'whichx'
import { Keyword } from '../models/keyword'

export const trim = async (text: string) => {
  let output
  const trimmer = new WhichX()
  const labels: string[] = ['masuk', 'keluar']
  await Keyword.find({}, { _id: 0, keyword: 1 }).then((res) => {
    console.log('Trimming...')
    trimmer.addLabels(labels)
    trimmer.addData('masuk', res[0].keyword)
    trimmer.addData('keluar', res[1].keyword)

    output = trimmer.classify(text.toLowerCase())
  })

  if (output === 'masuk') return 'Surat Masuk'
  if (output === 'keluar') return 'Surat Keluar'

  return 'Error'
}
