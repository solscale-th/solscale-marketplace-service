import { existsSync, mkdirSync, unlinkSync } from 'fs'

const makeDirIfNotExists = (dir: string) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

const removeFile = (filePath: string): void => unlinkSync(filePath)

export default {
  makeDirIfNotExists,
  removeFile,
}
