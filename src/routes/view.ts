import { Router } from 'express'
import { Request, Response } from 'express'
import { Masuk } from '../models/masuk'
import { Keluar } from '../models/keluar'
import { User } from '../models/user'
import { Keyword } from '../models/keyword'

export const router = Router()

router.get('/signin', async (req: Request, res: Response) => {
  if (req.session.user) {
    req.flash(
      'notification',
      'Sesi login masih ada, silahkan keluar terlebih dahulu.'
    )
    return res.redirect('/')
  }

  return res.render('signin', {
    layout: 'layout',
    notification: req.flash('notification'),
  })
})

router.get('/keyword', async (req: Request, res: Response) => {
  if (!req.session.user) {
    req.flash('notification', 'Harap masuk untuk melanjutkan.')
    return res.redirect('/signin')
  }

  if (req.session.user.role !== 'SUPER') {
    req.flash('notification', 'Anda tidak berhak mengakses halaman ini.')
    return res.redirect('/')
  }

  const keyword = await Keyword.find({}, { _id: 0, keyword: 1 })

  return res.render('keyword', {
    layout: 'layout',
    notification: req.flash('notification'),
    keyword,
  })
})

router.get('/users', async (req: Request, res: Response) => {
  if (!req.session.user) {
    req.flash('notification', 'Harap masuk untuk melanjutkan.')
    return res.redirect('/signin')
  }

  const { role, address } = req.session.user

  if (role !== 'SUPER' && role !== 'ROOT') {
    req.flash('notification', 'Anda tidak berhak mengakses halaman ini.')
    return res.redirect('/')
  }

  let users: any

  const { category, query } = req.query

  if (role === 'SUPER') {
    if (!category) {
      return res.redirect('/')
    } else if (category === 'name') {
      users = await User.find({
        name: { $regex: query, $options: 'i' },
        address,
      }).sort({ name: 1 })
    } else if (category === 'email') {
      users = await User.find({
        email: { $regex: query, $options: 'i' },
        address,
      }).sort({ email: 1 })
    } else if (category === 'role') {
      users = await User.find({
        role: { $regex: query, $options: 'i' },
        address,
      }).sort({ role: 1 })
    } else if (category === 'phone') {
      users = await User.find({
        phone: { $regex: query, $options: 'i' },
        address,
      }).sort({ phone: 1 })
    }
  } else if (role === 'ROOT') {
    if (!category) {
      return res.redirect('/')
    } else if (category === 'name') {
      users = await User.find({
        name: { $regex: query, $options: 'i' },
      }).sort({ name: 1 })
    } else if (category === 'email') {
      users = await User.find({
        email: { $regex: query, $options: 'i' },
      }).sort({ email: 1 })
    } else if (category === 'role') {
      users = await User.find({
        role: { $regex: query, $options: 'i' },
      }).sort({ role: 1 })
    } else if (category === 'address') {
      users = await User.find({
        address: { $regex: query, $options: 'i' },
      }).sort({ address: 1 })
    } else if (category === 'phone') {
      users = await User.find({
        phone: { $regex: query, $options: 'i' },
      }).sort({ phone: 1 })
    }
  }

  return res.render('users', {
    layout: 'layout',
    notification: req.flash('notification'),
    users,
    category,
    query,
  })
})

router.get('/masuk', async (req: Request, res: Response) => {
  if (!req.session.user) {
    req.flash('notification', 'Harap masuk untuk melanjutkan.')
    return res.redirect('/signin')
  }

  let surats: any

  const { category, query } = req.query

  if (!category) {
    return res.redirect('/')
  } else if (category === 'no') {
    surats = await Masuk.find({
      no: { $regex: query, $options: 'i' },
    }).sort({ no: 1 })
  } else if (category === 'date') {
    surats = await Masuk.find({
      date: { $regex: query, $options: 'i' },
    }).sort({ date: 1 })
  } else if (category === 'about') {
    surats = await Masuk.find({
      about: { $regex: query, $options: 'i' },
    }).sort({ about: 1 })
  }

  return res.render('masuk', {
    layout: 'layout',
    notification: req.flash('notification'),
    surats,
    category,
    query,
    keluar: false,
  })
})

router.get('/keluar', async (req: Request, res: Response) => {
  if (!req.session.user) {
    req.flash('notification', 'Harap masuk untuk melanjutkan.')
    return res.redirect('/signin')
  }

  let surats: any

  const { category, query } = req.query

  if (!category) {
    return res.redirect('/')
  } else if (category === 'no') {
    surats = await Keluar.find({
      no: { $regex: query, $options: 'i' },
    }).sort({ no: 1 })
  } else if (category === 'date') {
    surats = await Keluar.find({
      date: { $regex: query, $options: 'i' },
    }).sort({ date: 1 })
  } else if (category === 'about') {
    surats = await Keluar.find({
      about: { $regex: query, $options: 'i' },
    }).sort({ about: 1 })
  } else if (category === 'sender') {
    surats = await Keluar.find({
      sender: { $regex: query, $options: 'i' },
    }).sort({ sender: 1 })
  }

  return res.render('keluar', {
    layout: 'layout',
    notification: req.flash('notification'),
    surats,
    category,
    query,
    keluar: true,
  })
})

router.get('/edit-profile', async (req: Request, res: Response) => {
  if (!req.session.user) return res.redirect('/signin')

  const user = await User.findById(req.session.user.id)

  return res.render('edit', {
    layout: 'layout',
    notification: req.flash('notification'),
    user,
  })
})

router.get('/', async (req: Request, res: Response) => {
  if (!req.session.user) {
    req.flash('notification', 'Harap masuk untuk melanjutkan.')
    return res.redirect('/signin')
  }

  const masuk = await Masuk.find().count()
  const keluar = await Keluar.find().count()

  return res.render('index', {
    layout: 'layout',
    notification: req.flash('notification'),
    masuk,
    keluar,
  })
})
