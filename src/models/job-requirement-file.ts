import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface JobRequirementFileAttributes {
  id: number;
  jobId: number;
  kind: string;
  required: boolean;
  fileUrl?: string;
  originalFilename?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type JobRequirementFilePk = 'id'
export type JobRequirementFileId = JobRequirementFile[JobRequirementFilePk]
export type JobRequirementFileOptionalAttributes = 'id' | 'required' | 'fileUrl' | 'originalFilename' | 'createdAt' | 'updatedAt'
export type JobRequirementFileCreationAttributes = Optional<JobRequirementFileAttributes, JobRequirementFileOptionalAttributes>

export class JobRequirementFile extends Model<JobRequirementFileAttributes, JobRequirementFileCreationAttributes> implements JobRequirementFileAttributes {
  id!: number
  jobId!: number
  kind!: string
  required!: boolean
  fileUrl?: string
  originalFilename?: string
  createdAt!: Date
  updatedAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof JobRequirementFile {
    return JobRequirementFile.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kind: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      required: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      fileUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      originalFilename: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'JobRequirementFile',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: 'job_requirement_file_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'job_requirement_file_job_id',
          fields: [{ name: 'jobId' }],
        },
      ],
    })
  }
}
