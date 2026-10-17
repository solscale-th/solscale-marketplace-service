import { JobAddon, JobAddonCreationAttributes } from '@/models/init-model'

class JobAddonRepository {
  public static create(payload: JobAddonCreationAttributes) {
    return JobAddon.create(payload)
  }

  public static listByJob(jobId: number) {
    return JobAddon.findAll({
      where: { jobId },
      order: [['id', 'ASC']],
    })
  }
}

export default JobAddonRepository
