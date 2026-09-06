import bcrypt from 'bcrypt'
import { isNil } from 'lodash'

import { EntrepreneurPayload, LoginEntrepreneurPayload, MutationCreateEntrepreneurArgs, MutationDepositFundsArgs, MutationLoginEntrepreneurArgs, MutationLoginEntrepreneurWithGoogleArgs, MutationLoginEntrepreneurWithLineArgs, MutationUpdateEntrepreneurArgs } from '@/generated/graphql'
import { EntrepreneurRepository, InfluencerRepository } from '@/repositories'
import { buildResponse, CustomError, formatError, JWTUtils, ResponseMessage, stripNulls, verifyGoogleAccessToken, verifyLineCode } from '@/utils'
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
      if (isNil(entrepreneur) || isNil(entrepreneur.password))
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

  public static async loginEntrepreneurWithGoogle(_: unknown, { input }: MutationLoginEntrepreneurWithGoogleArgs, ctx: Context): Promise<LoginEntrepreneurPayload> {
    try {
      const profile = await verifyGoogleAccessToken(input.accessToken)

      let entrepreneur = await EntrepreneurRepository.findByGoogleId(profile.googleId)

      if (isNil(entrepreneur)) {
        const existingByEmail = await EntrepreneurRepository.findByEmail(profile.email)

        if (!isNil(existingByEmail)) {
          entrepreneur = await EntrepreneurRepository.linkGoogleId(existingByEmail.id, profile.googleId)
        } else {
          const existingInfluencer = await InfluencerRepository.findByEmail(profile.email)
          if (!isNil(existingInfluencer))
            throw new CustomError('409', ErrorMessage.DuplicatedRecord)

          entrepreneur = await EntrepreneurRepository.create({
            email: profile.email,
            password: null,
            googleId: profile.googleId,
            companyName: '',
          })
        }
      }

      if (isNil(entrepreneur))
        throw new CustomError('500', ErrorMessage.Internal)

      const token = JWTUtils.sign({ id: String(entrepreneur.id), type: 'ENTREPRENEUR' })
      return buildResponse({ success: true, data: { token, entrepreneur }, message: Success.Login })
    } catch (err) {
      const { code, message } = formatError('loginEntrepreneurWithGoogle', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async loginEntrepreneurWithLine(_: unknown, { input }: MutationLoginEntrepreneurWithLineArgs, ctx: Context): Promise<LoginEntrepreneurPayload> {
    try {
      const profile = await verifyLineCode(input.code, input.redirectUri)

      let entrepreneur = await EntrepreneurRepository.findByLineId(profile.lineId)

      if (isNil(entrepreneur)) {
        const existingByEmail = profile.email ? await EntrepreneurRepository.findByEmail(profile.email) : null

        if (!isNil(existingByEmail)) {
          entrepreneur = await EntrepreneurRepository.linkLineId(existingByEmail.id, profile.lineId)
        } else {
          if (profile.email) {
            const existingInfluencer = await InfluencerRepository.findByEmail(profile.email)
            if (!isNil(existingInfluencer))
              throw new CustomError('409', ErrorMessage.DuplicatedRecord)
          }

          entrepreneur = await EntrepreneurRepository.create({
            email: profile.email ?? null,
            password: null,
            lineId: profile.lineId,
            companyName: '',
          })
        }
      }

      if (isNil(entrepreneur))
        throw new CustomError('500', ErrorMessage.Internal)

      const token = JWTUtils.sign({ id: String(entrepreneur.id), type: 'ENTREPRENEUR' })
      return buildResponse({ success: true, data: { token, entrepreneur }, message: Success.Login })
    } catch (err) {
      const { code, message } = formatError('loginEntrepreneurWithLine', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async updateEntrepreneur(_: unknown, { input }: MutationUpdateEntrepreneurArgs, ctx: Context): Promise<EntrepreneurPayload> {
    try {
      if (isNil(ctx.id) || ctx.type !== 'ENTREPRENEUR')
        throw new CustomError('401', ErrorMessage.Unauthorized)

      if (input.email) {
        const existingInfluencer = await InfluencerRepository.findByEmail(input.email)
        if (!isNil(existingInfluencer))
          throw new CustomError('409', ErrorMessage.DuplicatedRecord)
      }

      const data = await EntrepreneurRepository.update(Number(ctx.id), stripNulls(input))
      return buildResponse({ success: true, data, message: Success.Update })
    } catch (err) {
      const { code, message } = formatError('updateEntrepreneur', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async depositFunds(_: unknown, { input }: MutationDepositFundsArgs, ctx: Context): Promise<EntrepreneurPayload> {
    try {
      if (isNil(ctx.id) || ctx.type !== 'ENTREPRENEUR')
        throw new CustomError('401', ErrorMessage.Unauthorized)

      if (input.amount <= 0)
        throw new CustomError('400', ErrorMessage.InvalidDepositAmount)

      const data = await EntrepreneurRepository.depositFunds(Number(ctx.id), input.amount)
      return buildResponse({ success: true, data, message: Success.Update })
    } catch (err) {
      const { code, message } = formatError('depositFunds', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }
}

const mutations = {
  Mutation: {
    createEntrepreneur: EntrepreneurController.createEntrepreneur,
    loginEntrepreneur: EntrepreneurController.loginEntrepreneur,
    loginEntrepreneurWithGoogle: EntrepreneurController.loginEntrepreneurWithGoogle,
    loginEntrepreneurWithLine: EntrepreneurController.loginEntrepreneurWithLine,
    updateEntrepreneur: EntrepreneurController.updateEntrepreneur,
    depositFunds: EntrepreneurController.depositFunds,
  },
}

export default mutations
