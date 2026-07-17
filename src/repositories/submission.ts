import { Submission, SubmissionCreationAttributes } from '@/models/init-model'

class SubmissionRepository {
  public static create(payload: SubmissionCreationAttributes) {
    return Submission.create(payload)
  }

  public static listByEngagement(engagementId: number) {
    return Submission.findAll({
      where: { engagementId },
      order: [['id', 'DESC']],
    })
  }
}

export default SubmissionRepository
