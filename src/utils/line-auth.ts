const { LINE_CHANNEL_ID, LINE_CHANNEL_SECRET } = process.env

export interface LineProfile {
  lineId: string
  email?: string
  name?: string
}

interface LineTokenResponse {
  id_token?: string
  error?: string
  error_description?: string
}

interface LineVerifyResponse {
  sub?: string
  email?: string
  name?: string
  error?: string
  error_description?: string
}

export const verifyLineCode = async (code: string, redirectUri: string): Promise<LineProfile> => {
  if (!LINE_CHANNEL_ID || !LINE_CHANNEL_SECRET)
    throw new Error('Missing LINE_CHANNEL_ID/LINE_CHANNEL_SECRET')

  const tokenRes = await fetch('https://api.line.me/oauth2/v2.1/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: LINE_CHANNEL_ID,
      client_secret: LINE_CHANNEL_SECRET,
    }),
  })
  const tokenBody = await tokenRes.json() as LineTokenResponse
  if (!tokenRes.ok || !tokenBody.id_token)
    throw new Error(tokenBody.error_description || 'Failed to exchange LINE authorization code')

  const verifyRes = await fetch('https://api.line.me/oauth2/v2.1/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ id_token: tokenBody.id_token, client_id: LINE_CHANNEL_ID }),
  })
  const payload = await verifyRes.json() as LineVerifyResponse
  if (!verifyRes.ok || !payload.sub)
    throw new Error(payload.error_description || 'Invalid LINE ID token')

  return { lineId: payload.sub, email: payload.email, name: payload.name }
}
