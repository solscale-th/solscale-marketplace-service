import { InfluencerPortfolioItem, InfluencerPortfolioItemCreationAttributes } from '@/models/init-model'

class InfluencerPortfolioItemRepository {
  public static listByInfluencer(influencerId: number) {
    return InfluencerPortfolioItem.findAll({
      where: { influencerId },
      order: [['id', 'ASC']],
    })
  }

  public static async replaceAllForInfluencer(influencerId: number, items: Omit<InfluencerPortfolioItemCreationAttributes, 'influencerId'>[]) {
    await InfluencerPortfolioItem.destroy({ where: { influencerId } })
    if (items.length === 0)
      return []

    return InfluencerPortfolioItem.bulkCreate(items.map((item) => ({ ...item, influencerId })))
  }
}

export default InfluencerPortfolioItemRepository
