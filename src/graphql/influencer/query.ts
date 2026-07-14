import { InfluencerPayload, InfluencersPayload, QueryInfluencerArgs } from '@/generated/graphql'
import { InfluencerRepository } from '@/repositories'
import { buildResponse, formatError, ResponseMessage } from '@/utils'
import { Context } from '@/utils/context'

const { Success } = ResponseMessage

class InfluencerController {
  public static async influencers(_: unknown, __: unknown, ctx: Context): Promise<InfluencersPayload> {
    try {
      const data = await InfluencerRepository.list()
      return buildResponse({ success: true, data, message: Success.Query })
    } catch (err) {
      const { code, message } = formatError('influencers', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async influencer(_: unknown, { id }: QueryInfluencerArgs, ctx: Context): Promise<InfluencerPayload> {
    try {
      const data = await InfluencerRepository.findById(id)
      return buildResponse({ success: true, data, message: Success.Query })
    } catch (err) {
      const { code, message } = formatError('influencer', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }
}

const queries = {
  Query: {
    influencers: InfluencerController.influencers,
    influencer: InfluencerController.influencer,
  },
}

export default queries
