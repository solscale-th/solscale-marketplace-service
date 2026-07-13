import multer from 'multer'

const storage = multer.memoryStorage()

export default multer({
  storage,
  limits: {
    fileSize: (process.env.LIMIT_FILE_SIZE ? parseInt(process.env.LIMIT_FILE_SIZE) : 5) * 1024 * 1024
  }
})
