import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface SubmissionAttributes {
  id: number;
  engagementId: number;
  links?: string[];
  note?: string;
  status: string;
  reviewNote?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type SubmissionPk = 'id'
export type SubmissionId = Submission[SubmissionPk]
export type SubmissionOptionalAttributes = 'id' | 'links' | 'note' | 'status' | 'reviewNote' | 'createdAt' | 'updatedAt'
export type SubmissionCreationAttributes = Optional<SubmissionAttributes, SubmissionOptionalAttributes>

export class Submission extends Model<SubmissionAttributes, SubmissionCreationAttributes> implements SubmissionAttributes {
  id!: number
  engagementId!: number
  links?: string[]
  note?: string
  status!: string
  reviewNote?: string
  createdAt!: Date
  updatedAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof Submission {
    return Submission.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      engagementId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      links: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'pending_review',
      },
      reviewNote: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'Submission',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: 'submission_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    })
  }
}
