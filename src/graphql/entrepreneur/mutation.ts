import bcrypt from 'bcrypt'
import { isNil } from 'lodash'

import { EntrepreneurPayload, LoginEntrepreneurPayload, MutationCreateEntrepreneurArgs, MutationLoginEntrepreneurArgs } from '@/generated/graphql'
import { EntrepreneurRepository, InfluencerRepository } from '@/repositories'
import { buildResponse, CustomError, formatError, JWTUtils, ResponseMessage, stripNulls } from '@/utils'
import { Context } from '@/utils/context'

const { Success, Error: ErrorMessage } = ResponseMessage

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
}

const mutations = {
  Mutation: {
    createEntrepreneur: EntrepreneurController.createEntrepreneur,
    loginEntrepreneur: EntrepreneurController.loginEntrepreneur,
  },
}

export default mutations
