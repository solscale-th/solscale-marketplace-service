import bcrypt from 'bcrypt'
import { OAuth2Client } from 'google-auth-library'
import { isNil } from 'lodash'

import { EntrepreneurPayload, LoginEntrepreneurPayload, MutationCreateEntrepreneurArgs, MutationLoginEntrepreneurArgs } from '@/generated/graphql'
import { EntrepreneurRepository, InfluencerRepository } from '@/repositories'
import { buildResponse, CustomError, formatError, JWTUtils, ResponseMessage, stripNulls } from '@/utils'
import { Context } from '@/utils/context'

const { Success, Error: ErrorMessage } = ResponseMessage

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class EntrepreneurController {
  public static async createEntrepreneur(_: unknown, { input }: MutationCreateEntrepreneurArgs, ctx: Context): Promise<EntrepreneurPayload> {
    try {
      const existingInfluencer = await InfluencerRepository.findByEmail(input.email)
      if (!isNil(existingInfluencer))
        throw new CustomError('409', ErrorMessage.DuplicatedRecord)

      const data = await EntrepreneurRepository.create(stripNulls(input))
      return buildResponse({ success: true, data, message: Success.Mutation })
    } catch (err) {
      const { code, message } = formatError('createEntrepreneur', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async loginEntrepreneur(_: unknown, { input }: MutationLoginEntrepreneurArgs, ctx: Context): Promise<LoginEntrepreneurPayload> {
    try {
      const entrepreneur = await EntrepreneurRepository.findByEmail(input.email)
      if (isNil(entrepreneur))
        throw new CustomError('401', ErrorMessage.InvalidCredential)

      const isPasswordValid = await bcrypt.compare(input.password, entrepreneur.password)
      if (!isPasswordValid)
        throw new CustomError('401', ErrorMessage.InvalidCredential)

      const token = JWTUtils.sign({ id: String(entrepreneur.id), type: 'ENTREPRENEUR' })
      return buildResponse({ success: true, data: { token, entrepreneur }, message: Success.Login })
    } catch (err) {
      const { code, message } = formatError('loginEntrepreneur', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async loginEntrepreneurWithGoogle(_: unknown, { input }: { input: { accessToken: string } }, ctx: Context): Promise<LoginEntrepreneurPayload> {
    try {
      const tokenInfo = await googleClient.getTokenInfo(input.accessToken)
      if (!tokenInfo.email) throw new CustomError('401', ErrorMessage.InvalidCredential)

      const { entrepreneur } = await EntrepreneurRepository.findOrCreateByGoogle(tokenInfo.email)

      const token = JWTUtils.sign({ id: String(entrepreneur.id), type: 'ENTREPRENEUR' })
      return buildResponse({ success: true, data: { token, entrepreneur }, message: Success.Login })
    } catch (err) {
      const { code, message } = formatError('loginEntrepreneurWithGoogle', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async updateEntrepreneur(_: unknown, { input }: { input: { companyName?: string } }, ctx: Context): Promise<EntrepreneurPayload> {
    try {
      if (!ctx.id) throw new CustomError('401', ErrorMessage.InvalidCredential)

      const entrepreneur = await EntrepreneurRepository.updateById(Number(ctx.id), {
        ...(input.companyName !== undefined ? { companyName: input.companyName } : {}),
      })
      if (!entrepreneur) throw new CustomError('404', 'Entrepreneur not found')

      return buildResponse({ success: true, data: entrepreneur, message: Success.Update })
    } catch (err) {
      const { code, message } = formatError('updateEntrepreneur', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }
}

const mutations = {
  Mutation: {
    createEntrepreneur: EntrepreneurController.createEntrepreneur,
    loginEntrepreneur: EntrepreneurController.loginEntrepreneur,
    loginEntrepreneurWithGoogle: EntrepreneurController.loginEntrepreneurWithGoogle,
    updateEntrepreneur: EntrepreneurController.updateEntrepreneur,
  },
}

export default mutations
