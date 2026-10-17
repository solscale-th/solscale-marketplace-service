import { InfluencerPackage, InfluencerPackageCreationAttributes } from '@/models/init-model'

class InfluencerPackageRepository {
  public static listByInfluencer(influencerId: number) {
    return InfluencerPackage.findAll({
      where: { influencerId },
      order: [['id', 'ASC']],
    })
  }

  public static async replaceAllForInfluencer(influencerId: number, packages: Omit<InfluencerPackageCreationAttributes, 'influencerId'>[]) {
    await InfluencerPackage.destroy({ where: { influencerId } })
    if (packages.length === 0)
      return []

    return InfluencerPackage.bulkCreate(packages.map((item) => ({ ...item, influencerId })))
  }
}

export default InfluencerPackageRepository
