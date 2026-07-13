import { ItemsPayload } from '@/generated/graphql'
import { ItemRepository } from '@/repositories'
import { buildResponse, formatError, ResponseMessage } from '@/utils'
import { Context } from '@/utils/context'

const { Success } = ResponseMessage

class ItemController {
  public static async items(_: unknown, __: unknown, ctx: Context): Promise<ItemsPayload> {
    try {
      const data = await ItemRepository.list()
      return buildResponse({ success: true, data, message: Success.Query })
    } catch (err) {
      const { code, message } = formatError('items', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }
}

const queries = {
  Query: {
    items: ItemController.items,
  },
}

export default queries
