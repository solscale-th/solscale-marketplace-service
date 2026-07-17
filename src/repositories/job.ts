import { Job, JobCreationAttributes } from '@/models/init-model'

class JobRepository {
  public static create(payload: JobCreationAttributes) {
    return Job.create(payload)
  }

  public static findById(id: number) {
    return Job.findByPk(id)
  }

  public static list() {
    return Job.findAll({
      order: [['id', 'DESC']],
    })
  }

  public static listByEntrepreneur(entrepreneurId: number) {
    return Job.findAll({
      where: { entrepreneurId },
      order: [['id', 'DESC']],
    })
  }

  public static async update(id: number, payload: Partial<JobCreationAttributes>) {
    await Job.update(payload, { where: { id } })
    return Job.findByPk(id)
  }
}

export default JobRepository
