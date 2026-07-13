import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

// Example model — replace with your real domain models (Product, Order, etc.)
// Each model file follows this exact shape: attributes interface, Pk/Id/
// CreationAttributes helper types, then the Model subclass with a static
// initModel(sequelize) that sequelize/init-model.ts calls on startup.

export interface ItemAttributes {
  id: number;
  name: string;
  description?: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ItemPk = 'id'
export type ItemId = Item[ItemPk]
export type ItemOptionalAttributes = 'id' | 'description' | 'createdAt' | 'updatedAt'
export type ItemCreationAttributes = Optional<ItemAttributes, ItemOptionalAttributes>

export class Item extends Model<ItemAttributes, ItemCreationAttributes> implements ItemAttributes {
  id!: number
  name!: string
  description?: string
  price!: number
  createdAt!: Date
  updatedAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof Item {
    return Item.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: 'Item',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: 'item_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    })
  }
}
