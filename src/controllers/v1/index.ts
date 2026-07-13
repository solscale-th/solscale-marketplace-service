import { Router } from 'express'

import file from './file'

const router = Router()

router.use('/file', file)

export default router
