const kmeans = require('kmeans-engine')
import { trim } from '../config/trim'

// jenis surat
const data = [
  // surat masuk
  {
    berita: 5,
    acara: 5,
    intstruksi: 5,
    keputusan: 5,
    kerjasama: 5,
    antar: 5,
    lembaga: 5,
    dalam: 5,
    negeri: 5,
    non: 5,
    pejabat: 5,
    negara: 5,
    lampiran: 5,
    laporan: 5,
    pengaduan: 5,
    layanan: 5,
    memorandum: 5,
    nota: 5,
    dinas: 5,
    pengajuan: 5,
    konsep: 5,
    naskah: 5,
    notula: 5,
    pedoman: 5,
    berdiri: 5,
    sendiri: 5,
    sebagai: 5,
    pengumuman: 5,
    petunjuk: 5,
    pelaksanaan: 5,
    sampul: 5,
    standar: 5,
    prosedur: 5,
    operasional: 5,
    surat: 5,
    edaran: 5,
    izin: 5,
    jalan: 5,
    keluar: 5,
    keterangan: 5,
    kuasa: 5,
    pengantar: 5,
    perintah: 5,
    tugas: 5,
    permohonan: 5,
    untuk: 5,
    mendapat: 5,
    undangan: 5,
    telaahan: 5,
    staf: 5,
  },
  // surat keluar
  {
    masuk: 5,
    luar: 5,
    dalam: 5,
    kejaksaan: 5,
    kejari: 5,
    kejagung: 5,
  },
]

export const clasify = (text: string = ' ') => {
  return kmeans.clusterize(
    data,
    { k: 2, maxIterations: 5, debug: false },
    (err: any, res: any) => {
      console.log('Classifying')

      return trim(text)
    }
  )
}
