import { OAuth2Client } from 'google-auth-library'

const { GOOGLE_CLIENT_ID } = process.env

const client = new OAuth2Client(GOOGLE_CLIENT_ID)

export interface GoogleProfile {
  googleId: string
  email: string
  givenName?: string
  familyName?: string
  name?: string
}

export const verifyGoogleIdToken = async (idToken: string): Promise<GoogleProfile> => {
  if (!GOOGLE_CLIENT_ID)
    throw new Error('Missing GOOGLE_CLIENT_ID')

  const ticket = await client.verifyIdToken({ idToken, audience: GOOGLE_CLIENT_ID })
  const payload = ticket.getPayload()

  if (!payload?.sub || !payload.email)
    throw new Error('Invalid Google token')
  if (!payload.email_verified)
    throw new Error('Google email is not verified')

  return {
    googleId: payload.sub,
    email: payload.email,
    givenName: payload.given_name,
    familyName: payload.family_name,
    name: payload.name,
  }
}
