const { GOOGLE_CLIENT_ID } = process.env

export interface GoogleProfile {
  googleId: string
  email: string
  givenName?: string
  familyName?: string
  name?: string
}

interface GoogleTokenInfo {
  aud?: string
  azp?: string
  sub?: string
  email?: string
  email_verified?: string
  error_description?: string
}

interface GoogleUserInfo {
  given_name?: string
  family_name?: string
  name?: string
  email?: string
}

export const verifyGoogleAccessToken = async (accessToken: string): Promise<GoogleProfile> => {
  if (!GOOGLE_CLIENT_ID)
    throw new Error('Missing GOOGLE_CLIENT_ID')

  const tokenInfoRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${encodeURIComponent(accessToken)}`)
  const tokenInfo = await tokenInfoRes.json() as GoogleTokenInfo

  if (!tokenInfoRes.ok || !tokenInfo.sub)
    throw new Error(tokenInfo.error_description || 'Invalid Google access token')
  if (tokenInfo.aud !== GOOGLE_CLIENT_ID && tokenInfo.azp !== GOOGLE_CLIENT_ID)
    throw new Error('Google access token was not issued for this app')
  if (!tokenInfo.email)
    throw new Error('Google account has no email')
  if (tokenInfo.email_verified !== 'true')
    throw new Error('Google email is not verified')

  const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const userInfo = userInfoRes.ok ? await userInfoRes.json() as GoogleUserInfo : {}

  return {
    googleId: tokenInfo.sub,
    email: tokenInfo.email,
    givenName: userInfo.given_name,
    familyName: userInfo.family_name,
    name: userInfo.name,
  }
}
