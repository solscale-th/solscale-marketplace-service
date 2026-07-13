import type { Context } from '../utils/context'

declare global {
  namespace Express {
    interface Request {
      user?: Context
    }
  }
}

export {}
