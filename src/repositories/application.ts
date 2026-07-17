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

  public static async update(id: number, payload: Partial<ApplicationCreationAttributes>) {
    await Application.update(payload, { where: { id } })
    return Application.findByPk(id)
  }
}

export default ApplicationRepository
