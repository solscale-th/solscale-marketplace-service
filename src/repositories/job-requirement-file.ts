import { JobRequirementFile, JobRequirementFileCreationAttributes } from '@/models/init-model'

class JobRequirementFileRepository {
  public static create(payload: JobRequirementFileCreationAttributes) {
    return JobRequirementFile.create(payload)
  }

  public static listByJob(jobId: number) {
    return JobRequirementFile.findAll({
      where: { jobId },
      order: [['id', 'ASC']],
    })
  }
}

export default JobRequirementFileRepository
