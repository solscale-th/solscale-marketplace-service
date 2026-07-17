import { Engagement, EngagementCreationAttributes } from '@/models/init-model'

class EngagementRepository {
  public static create(payload: EngagementCreationAttributes) {
    return Engagement.create(payload)
  }

  public static findById(id: number) {
    return Engagement.findByPk(id)
  }

  public static findByApplicationId(applicationId: number) {
    return Engagement.findOne({ where: { applicationId } })
  }

  public static listByInfluencer(influencerId: number) {
    return Engagement.findAll({
      where: { influencerId },
      order: [['id', 'DESC']],
    })
  }

  public static async update(id: number, payload: Partial<EngagementCreationAttributes>) {
    await Engagement.update(payload, { where: { id } })
    return Engagement.findByPk(id)
  }
}

export default EngagementRepository
