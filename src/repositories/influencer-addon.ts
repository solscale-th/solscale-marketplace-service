import { InfluencerAddon, InfluencerAddonCreationAttributes } from '@/models/init-model'

class InfluencerAddonRepository {
  public static listByInfluencer(influencerId: number) {
    return InfluencerAddon.findAll({
      where: { influencerId },
      order: [['id', 'ASC']],
    })
  }

  public static async replaceAllForInfluencer(influencerId: number, addons: Omit<InfluencerAddonCreationAttributes, 'influencerId'>[]) {
    await InfluencerAddon.destroy({ where: { influencerId } })
    if (addons.length === 0)
      return []

    return InfluencerAddon.bulkCreate(addons.map((item) => ({ ...item, influencerId })))
  }
}

export default InfluencerAddonRepository
