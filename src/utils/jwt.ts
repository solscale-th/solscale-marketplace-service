import JWT from 'jsonwebtoken'
import { isNil } from 'lodash'

const {
  PUBLIC_KEY,
  PRIVATE_KEY,
  PASSPHRASE,
} = process.env

export class JWTUtils {
  private static readonly RESET_PASSWORD_EXPIRATION = '15m'

  public static verify(token: string) {
    if (isNil(PUBLIC_KEY))
      throw new Error('Missing public key')
    const publicKey = Buffer.from(PUBLIC_KEY).toString('utf8')
    const ctx = token.split('Bearer ').pop()
    return JWT.verify(String(ctx), publicKey, { algorithms: ['RS256'] }) as { id: string, type: string, iat: number }
  }

  public static sign(payload: object, expiresIn?: string) {
    if (isNil(PRIVATE_KEY)) throw new Error('Missing private key')
    if (isNil(PASSPHRASE)) throw new Error('Missing passphrase')
    const privateKey = Buffer.from(PRIVATE_KEY).toString('utf8')
    return JWT.sign(
      payload,
      { key: privateKey, passphrase: String(PASSPHRASE) },
      { algorithm: 'RS256', ...(expiresIn ? { expiresIn } : {}) },
    )
  }

  public static signResetPasswordToken(code: string) {
    return JWTUtils.sign({ code }, JWTUtils.RESET_PASSWORD_EXPIRATION)
  }

  public static verifyResetPasswordToken(token: string) {
    if (isNil(PUBLIC_KEY)) throw new Error('Missing public key')
    const publicKey = Buffer.from(PUBLIC_KEY).toString('utf8')
    return JWT.verify(token, publicKey, { algorithms: ['RS256'] }) as { code: string }
  }
}
