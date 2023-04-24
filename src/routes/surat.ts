import { Router } from 'express'
import { upload } from '../utils/multer'
import * as surat from '../controllers/surat'

export const router = Router()

router.post('/', upload.single('file'), surat.upload)

router.delete('/', surat.remove)

router.put('/', surat.edit)

router.post('/masuk', surat.search)

router.post('/keluar', surat.search)
