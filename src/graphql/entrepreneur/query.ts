import { EntrepreneurPayload, EntrepreneursPayload, QueryEntrepreneurArgs } from '@/generated/graphql'
import { EntrepreneurRepository } from '@/repositories'
import { buildResponse, formatError, ResponseMessage } from '@/utils'
import { Context } from '@/utils/context'

const { Success } = ResponseMessage

class EntrepreneurController {
  public static async entrepreneurs(_: unknown, __: unknown, ctx: Context): Promise<EntrepreneursPayload> {
    try {
      const data = await EntrepreneurRepository.list()
      return buildResponse({ success: true, data, message: Success.Query })
    } catch (err) {
      const { code, message } = formatError('entrepreneurs', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }

  public static async entrepreneur(_: unknown, { id }: QueryEntrepreneurArgs, ctx: Context): Promise<EntrepreneurPayload> {
    try {
      const data = await EntrepreneurRepository.findById(id)
      return buildResponse({ success: true, data, message: Success.Query })
    } catch (err) {
      const { code, message } = formatError('entrepreneur', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }
}

const queries = {
  Query: {
    entrepreneurs: EntrepreneurController.entrepreneurs,
    entrepreneur: EntrepreneurController.entrepreneur,
  },
}

export default queries
