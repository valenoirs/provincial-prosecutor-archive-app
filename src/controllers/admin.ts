import { Request, Response } from 'express'
import { User } from '../models/user'

/**
 * add new user controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const add = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })

    if (user) {
      req.flash(
        'notification',
        'User dengan informasi login yang sama ditemukan.'
      )
      console.log('[SERVER]: User already existed.')
      return res.redirect('back')
    }

    await new User(req.body).save()

    req.flash('notification', 'Pengguna berhasil ditambahkan.')
    console.log('[SERVER]: New user added.')
    return res.redirect('back')
  } catch (error) {
    req.flash(
      'notification',
      'Terjadi kesalahan saat menambahkan pengguna baru, coba lagi.'
    )
    console.error('[SERVER]: Adding User error.', error)
    return res.redirect('/')
  }
}

/**
 * delete user controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    const user = await User.findById(id)

    if (!user) {
      req.flash('notification', 'Pengguna tidak ditemukan.')
      console.log('[SERVER]: User not found.')
      return res.redirect('back')
    }

    await User.findByIdAndDelete(id)

    req.flash('notification', 'Pengguna berhasil dihapus.')
    console.log('[SERVER]: Pengguna deleted.')
    return res.redirect('back')
  } catch (error) {
    req.flash(
      'notification',
      'Terjadi kesalahan saat menghapus Pengguna, coba lagi.'
    )
    console.error('[SERVER]: Pengguna delete error.', error)
    return res.redirect('/')
  }
}

/**
 * edit user controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const edit = async (req: Request, res: Response) => {
  try {
    const { id } = req.body

    const user = await User.findById(id)

    if (!user) {
      req.flash('notification', 'Pengguna tidak ditemukan.')
      console.log('[SERVER]: User not found.')
      return res.redirect('back')
    }

    await User.findByIdAndUpdate(id, { $set: req.body })

    req.flash('notification', 'Pengguna berhasil diubah.')
    console.log('[SERVER]: Pengguna edited.')
    return res.redirect('back')
  } catch (error) {
    req.flash(
      'notification',
      'Terjadi kesalahan saat mengubah informasi Pengguna, coba lagi.'
    )
    console.error('[SERVER]: Edit pengguna error.', error)
    return res.redirect('/')
  }
}

/**
 * Search user controller
 * @param req Node HTTP Request
 * @param res Node HTTP Response
 * @returns HTTP Response
 */
export const search = async (req: Request, res: Response) => {
  try {
    const { category, query } = req.body

    if (category === 'name') {
      return res.redirect(`/users?category=${category}&query=${query}`)
    }
    if (category === 'email') {
      return res.redirect(`/users?category=${category}&query=${query}`)
    }
    if (category === 'role') {
      return res.redirect(`/users?category=${category}&query=${query}`)
    }
    if (category === 'address') {
      return res.redirect(`/users?category=${category}&query=${query}`)
    }
    if (category === 'phone') {
      return res.redirect(`/users?category=${category}&query=${query}`)
    }

    req.flash(
      'notification',
      'Terjadi kesalahan saat melakukan pencarian, coba lagi.'
    )
    console.log('[SERVER]: User search error.')
    return res.redirect('back')
  } catch (error) {
    req.flash(
      'notification',
      'Terjadi kesalahan saat melakukan pencarian, coba lagi.'
    )
    console.error('[SERVER]: User search error.', error)
    return res.redirect('/')
  }
}
