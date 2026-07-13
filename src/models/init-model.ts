import type { Sequelize } from 'sequelize'

import { Item } from './item'

export { Item }

// As you add models, import + init + (optionally) wire up associations here.
// The umi-erp-service repo generates this file with sequelize-auto from an
// existing database; for a brand-new project it's simplest to hand-write it
// and add one block per model as you create them.
export function initModels(sequelize: Sequelize) {
  Item.initModel(sequelize)

  return {
    Item,
  }
}
