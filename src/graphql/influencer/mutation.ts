import bcrypt from 'bcrypt'
import { isNil } from 'lodash'

import { InfluencerPayload, LoginInfluencerPayload, MutationCreateInfluencerArgs, MutationLoginInfluencerArgs, MutationLoginInfluencerWithGoogleArgs } from '@/generated/graphql'
import { EntrepreneurRepository, InfluencerRepository } from '@/repositories'
import { buildResponse, CustomError, formatError, JWTUtils, ResponseMessage, stripNulls, verifyGoogleIdToken } from '@/utils'
import { Context } from '@/utils/context'

const { Success, Error: ErrorMessage } = ResponseMessage

class InfluencerController {
  public static async createInfluencer(_: unknown, { input }: MutationCreateInfluencerArgs, ctx: Context): Promise<InfluencerPayload> {
    try {
      const existingEntrepreneur = await EntrepreneurRepository.findByEmail(input.email)
      if (!isNil(existingEntrepreneur))
        throw new CustomError('409', ErrorMessage.DuplicatedRecord)

      const data = await InfluencerRepository.create(stripNulls(input))
      return buildResponse({ success: true, data, message: Success.Mutation })
    } catch (err) {
      const { code, message } = formatError('createInfluencer', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async loginInfluencer(_: unknown, { input }: MutationLoginInfluencerArgs, ctx: Context): Promise<LoginInfluencerPayload> {
    try {
      const influencer = await InfluencerRepository.findByEmail(input.email)
      if (isNil(influencer))
        throw new CustomError('401', ErrorMessage.InvalidCredential)

      const isPasswordValid = await bcrypt.compare(input.password, influencer.password)
      if (!isPasswordValid)
        throw new CustomError('401', ErrorMessage.InvalidCredential)

      const token = JWTUtils.sign({ id: String(influencer.id), type: 'INFLUENCER' })
      return buildResponse({ success: true, data: { token, influencer }, message: Success.Login })
    } catch (err) {
      const { code, message } = formatError('loginInfluencer', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async loginInfluencerWithGoogle(_: unknown, { input }: MutationLoginInfluencerWithGoogleArgs, ctx: Context): Promise<LoginInfluencerPayload> {
    try {
      const profile = await verifyGoogleIdToken(input.idToken)

      let influencer = await InfluencerRepository.findByGoogleId(profile.googleId)

      if (isNil(influencer)) {
        const existingByEmail = await InfluencerRepository.findByEmail(profile.email)

        if (!isNil(existingByEmail)) {
          influencer = await InfluencerRepository.linkGoogleId(existingByEmail.id, profile.googleId)
        } else {
          const existingEntrepreneur = await EntrepreneurRepository.findByEmail(profile.email)
          if (!isNil(existingEntrepreneur))
            throw new CustomError('409', ErrorMessage.DuplicatedRecord)

          influencer = await InfluencerRepository.create({
            email: profile.email,
            password: null,
            googleId: profile.googleId,
            firstName: profile.givenName || profile.name?.split(' ')[0] || 'Google',
            lastName: profile.familyName || profile.name?.split(' ').slice(1).join(' ') || 'User',
          })
        }
      }

      if (isNil(influencer))
        throw new CustomError('500', ErrorMessage.Internal)

      const token = JWTUtils.sign({ id: String(influencer.id), type: 'INFLUENCER' })
      return buildResponse({ success: true, data: { token, influencer }, message: Success.Login })
    } catch (err) {
      const { code, message } = formatError('loginInfluencerWithGoogle', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }
}

const mutations = {
  Mutation: {
    createInfluencer: InfluencerController.createInfluencer,
    loginInfluencer: InfluencerController.loginInfluencer,
    loginInfluencerWithGoogle: InfluencerController.loginInfluencerWithGoogle,
  },
}

export default mutations
