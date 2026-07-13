import { Router } from 'express'

import v1Router from '@/controllers/v1'

const router = Router()

router.use('/v1', v1Router)

export default router
