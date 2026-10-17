import { col, fn } from 'sequelize'

import { Influencer, InfluencerReview, InfluencerReviewCreationAttributes } from '@/models/init-model'

class InfluencerReviewRepository {
  public static create(payload: InfluencerReviewCreationAttributes) {
    return InfluencerReview.create(payload)
  }

  public static listByInfluencer(influencerId: number) {
    return InfluencerReview.findAll({
      where: { influencerId },
      order: [['id', 'DESC']],
    })
  }

  public static async recomputeInfluencerRating(influencerId: number) {
    const result = await InfluencerReview.findOne({
      where: { influencerId },
      attributes: [
        [fn('AVG', col('rating')), 'averageRating'],
        [fn('COUNT', col('id')), 'reviewCount'],
      ],
      raw: true,
    }) as unknown as { averageRating: string | null, reviewCount: string } | null

    await Influencer.update({
      averageRating: result?.averageRating ? Number(result.averageRating) : 0,
      reviewCount: result ? Number(result.reviewCount) : 0,
    }, { where: { id: influencerId } })
  }
}

export default InfluencerReviewRepository
