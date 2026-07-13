import jsonwebtoken from 'jsonwebtoken'

import { Context } from '@/utils'

const { PUBLIC_KEY } = process.env

class AuthorizationService {
  constructor() {
    if (!PUBLIC_KEY)
      throw new Error('RSA Key configuration is required')
  }

  verifyToken(token: string) {
    return jsonwebtoken.verify(
      token.split('Bearer ')[1],
      String(PUBLIC_KEY).replace(/\\n/g, '\n'),
      {
        algorithms: ['RS256'],
      },
    ) as Context
  }
}

export default new AuthorizationService()
