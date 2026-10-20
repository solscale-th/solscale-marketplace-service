import { Application, ApplicationCreationAttributes } from '@/models/init-model'

class ApplicationRepository {
  public static create(payload: ApplicationCreationAttributes) {
    return Application.create(payload)
  }

  public static findById(id: number) {
    return Application.findByPk(id)
  }

  public static listByInfluencer(influencerId: number, source: string) {
    return Application.findAll({
      where: { influencerId, source },
      order: [['id', 'DESC']],
    })
  }

  public static listRequestedByInfluencer(influencerId: number, limit?: number, offset?: number) {
    return Application.findAll({
      where: { influencerId, source: 'invite', status: 'pending' },
      order: [['id', 'DESC']],
      limit,
      offset,
    })
  }

  public static listAcceptedByInfluencer(influencerId: number, limit?: number, offset?: number) {
    return Application.findAll({
      where: { influencerId, status: 'accepted' },
      order: [['id', 'DESC']],
      limit,
      offset,
    })
  }

  public static listByJob(jobId: number, source: string) {
    return Application.findAll({
      where: { jobId, source },
      order: [['id', 'DESC']],
    })
  }

  public static async update(id: number, payload: Partial<ApplicationCreationAttributes>) {
    await Application.update(payload, { where: { id } })
    return Application.findByPk(id)
  }
}

export default ApplicationRepository
