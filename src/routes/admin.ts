import { Router } from 'express'
import * as admin from '../controllers/admin'

export const router = Router()

router.post('/', admin.add)

router.delete('/', admin.remove)

router.put('/', admin.edit)

router.post('/search', admin.search)

router.post('/keyword', admin.keyword)
