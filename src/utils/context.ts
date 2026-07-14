export interface Context {
  id?: string
  requestUUID: string
  token?: string
  type?: 'CUSTOMER' | 'ADMIN' | 'INFLUENCER' | 'ENTREPRENEUR'
}
