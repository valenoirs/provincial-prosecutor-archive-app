import WhichX from 'whichx'

const trimmer = new WhichX()

const labels: string[] = ['masuk', 'keluar']

trimmer.addLabels(labels)
trimmer.addData('masuk', 'masuk luar dalam kejaksaan kejari kejagung')
trimmer.addData(
  'keluar',
  'berita acara  intstruksi keputusan kerjasama antar lembaga dalam negeri non pejabat negara lampiran laporan pengaduan layanan memorandum nota dinas pengajuan konsep naskah notula pedoman berdiri sendiri sebagai pengumuman petunjuk pelaksanaan sampul standar prosedur operasional surat edaran izin jalan keluar keterangan kuasa pengantar perintah tugas permohonan untuk mendapat surat undangan telaahan staf'
)

export const trim = (text: string) => {
  const output = trimmer.classify(text.toLowerCase())

  if (output === 'masuk') return 'Surat Masuk'
  if (output === 'keluar') return 'Surat Keluar'

  return 'Error'
}
