import { Router } from 'express'
import { upload } from '../utils/multer'
import * as surat from '../controllers/surat'

export const router = Router()

// Add new letter
router.post('/', upload.single('file'), surat.upload)

// Delete letter
router.delete('/', surat.remove)

// Edit letter
router.put('/', surat.edit)

// Mark letter as read
router.patch('/', surat.read)

// SEARCH
router.post('/masuk', surat.search)

router.post('/keluar', surat.search)

router.post('/send', surat.send)
