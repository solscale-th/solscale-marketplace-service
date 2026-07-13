import { Router } from 'express'

import { Multer, verifyBearerToken } from '@/middlewares'

const router = Router()

// Example REST endpoint (as opposed to GraphQL) — useful for multipart
// uploads, webhooks, and generated files (PDF/Excel) that don't fit
// naturally into a GraphQL response.
router.post('/upload', verifyBearerToken, Multer.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file to upload' })
  }
  // TODO: hand req.file.buffer off to a storage service (S3, GCS, etc.)
  return res.status(200).json({ message: 'Upload success', filename: req.file.originalname })
})

export default router
