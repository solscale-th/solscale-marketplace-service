import JWT, { SignOptions } from 'jsonwebtoken'
import { isNil } from 'lodash'

const {
  PUBLIC_KEY,
  PRIVATE_KEY,
  PASSPHRASE,
} = process.env

export class JWTUtils {
  private static readonly RESET_PASSWORD_EXPIRATION: SignOptions['expiresIn'] = '15m'

  public static verify(token: string) {
    if (isNil(PUBLIC_KEY))
      throw new Error('Missing public key')
    const publicKey = String(PUBLIC_KEY).replace(/\\n/g, '\n')
    const ctx = token.split('Bearer ').pop()
    return JWT.verify(String(ctx), publicKey, { algorithms: ['RS256'] }) as { id: string, type: string, iat: number }
  }

  public static sign(payload: object, expiresIn?: SignOptions['expiresIn']) {
    if (isNil(PRIVATE_KEY)) throw new Error('Missing private key')
    if (isNil(PASSPHRASE)) throw new Error('Missing passphrase')
    const privateKey = String(PRIVATE_KEY).replace(/\\n/g, '\n')
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
    const publicKey = String(PUBLIC_KEY).replace(/\\n/g, '\n')
    return JWT.verify(token, publicKey, { algorithms: ['RS256'] }) as { code: string }
  }
}
