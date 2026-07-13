import { Item, ItemCreationAttributes } from '@/models/init-model'

class ItemRepository {
  public static list() {
    return Item.findAll({
      order: [['id', 'ASC']],
    })
  }

  public static findById(id: number) {
    return Item.findByPk(id)
  }

  public static create(payload: ItemCreationAttributes) {
    return Item.create(payload)
  }
}

export default ItemRepository
