import { Request, Response } from 'express'
import { Masuk } from '../models/masuk'
import { Keluar } from '../models/keluar'
import { clasify } from '../utils/classifier'

/**
 * Upload surat controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const upload = async (req: Request, res: Response) => {
  try {
    const { no, about } = req.body

    const suratMasuk = await Masuk.findOne({ no })
    const suratKeluar = await Keluar.findOne({ no })

    if (!req.file) {
      req.flash('notification', 'Format file yang di upload tidak sesuai.')
      console.log('[SERVER]: Incorrect file format.')
      return res.redirect('back')
    }

    if (suratKeluar || suratMasuk) {
      req.flash('notification', 'Surat dengan nomor yang sama sudah diupload.')
      console.log('[SERVER]: Redundant file.')
      return res.redirect('back')
    }

    req.body.uri = `/upload/surat/${req.file?.filename}`
    req.body.sender = req.session.user.name

    const jenisSurat = clasify(about)

    if (jenisSurat === 'Surat Keluar') {
      await new Keluar(req.body).save()
    } else {
      await new Masuk(req.body).save()
    }

    req.flash('notification', 'Surat berhasil diupload.')
    console.log('[SERVER]: New surat uploaded.')
    return res.redirect('back')
  } catch (error) {
    req.flash(
      'notification',
      'Terjadi kesalahan saat proses upload surat, coba lagi.'
    )
    console.error('[SERVER]: Surat upload error.', error)
    return res.redirect('/')
  }
}

/**
 * Delete surat controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    const masuk = await Masuk.findById(id)
    const keluar = await Keluar.findById(id)

    if (!masuk && !keluar) {
      req.flash('notification', 'Surat tidak ditemukan.')
      console.log('[SERVER]: Surat not found.')
      return res.redirect('back')
    }

    if (masuk) {
      await Masuk.findByIdAndDelete(id)
    } else if (keluar) {
      await Keluar.findByIdAndDelete(id)
    }

    req.flash('notification', 'Surat berhasil dihapus.')
    console.log('[SERVER]: Surat deleted.')
    return res.redirect('back')
  } catch (error) {
    req.flash(
      'notification',
      'Terjadi kesalahan saat menghapus surat, coba lagi.'
    )
    console.error('[SERVER]: Surat delete error.', error)
    return res.redirect('/')
  }
}

/**
 * Edit surat controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const edit = async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    const masuk = await Masuk.findById(id)
    const keluar = await Keluar.findById(id)

    if (!masuk && !keluar) {
      req.flash('notification', 'Surat tidak ditemukan.')
      console.log('[SERVER]: Surat not found.')
      return res.redirect('back')
    }

    if (masuk) {
      await Masuk.findByIdAndUpdate(id, { $set: req.body })
    }
    if (keluar) {
      await Keluar.findByIdAndUpdate(id, { $set: req.body })
    }

    req.flash('notification', 'Surat berhasil diperbarui.')
    console.log('[SERVER]: Surat edited.')
    return res.redirect('back')
  } catch (error) {
    req.flash(
      'notification',
      'Terjadi kesalahan saat memperbarui surat, coba lagi.'
    )
    console.error('[SERVER]: Surat edit error.', error)
    return res.redirect('/')
  }
}

/**
 * Search surat controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const search = async (req: Request, res: Response) => {
  try {
    const { category, query } = req.body
    const { path } = req

    if (path === '/masuk') {
      if (category === 'no') {
        return res.redirect(`/masuk?category=${category}&query=${query}`)
      }
      if (category === 'date') {
        return res.redirect(`/masuk?category=${category}&query=${query}`)
      }
      if (category === 'about') {
        return res.redirect(`/masuk?category=${category}&query=${query}`)
      }
    }
    if (path === '/keluar') {
      if (category === 'no') {
        return res.redirect(`/keluar?category=${category}&query=${query}`)
      }
      if (category === 'date') {
        return res.redirect(`/keluar?category=${category}&query=${query}`)
      }
      if (category === 'about') {
        return res.redirect(`/keluar?category=${category}&query=${query}`)
      }
      if (category === 'sender') {
        return res.redirect(`/keluar?category=${category}&query=${query}`)
      }
    }

    req.flash(
      'notification',
      'Terjadi kesalahan saat melakukan pencarian, coba lagi.'
    )
    console.log('[SERVER]: Surat search error.')
    return res.redirect('back')
  } catch (error) {
    req.flash(
      'notification',
      'Terjadi kesalahan saat melakukan pencarian, coba lagi.'
    )
    console.error('[SERVER]: Surat search error.', error)
    return res.redirect('/')
  }
}
