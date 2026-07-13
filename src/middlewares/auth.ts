import { NextFunction, Request, Response } from 'express'
import { isNil } from 'lodash'

import { AuthorizationService } from '@/services'

export const verifyBearerToken = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization

  if (isNil(authorization) || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const context = AuthorizationService.verifyToken(authorization)
    req.user = context
    next()
  } catch {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
