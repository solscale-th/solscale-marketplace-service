import { ItemPayload, MutationCreateItemArgs } from '@/generated/graphql'
import { ItemRepository } from '@/repositories'
import { buildResponse, formatError, ResponseMessage } from '@/utils'
import { Context } from '@/utils/context'

const { Success } = ResponseMessage

class ItemController {
  public static async createItem(_: unknown, { input }: MutationCreateItemArgs, ctx: Context): Promise<ItemPayload> {
    try {
      const data = await ItemRepository.create(input)
      return buildResponse({ success: true, data, message: Success.Mutation })
    } catch (err) {
      const { code, message } = formatError('createItem', err, ctx.requestUUID)
      return buildResponse({ success: false, message, code })
    }
  }
}

const mutations = {
  Mutation: {
    createItem: ItemController.createItem,
  },
}

export default mutations
