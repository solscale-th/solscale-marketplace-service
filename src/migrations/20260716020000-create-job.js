module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Job', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      entrepreneurId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Entrepreneur', key: 'id' },
      },
      title: { allowNull: false, type: Sequelize.TEXT },
      description: { allowNull: false, type: Sequelize.TEXT },
      brief: { type: Sequelize.TEXT },
      platform: { allowNull: false, type: Sequelize.TEXT },
      deliverables: { type: Sequelize.JSONB },
      requirements: { type: Sequelize.JSONB },
      tags: { type: Sequelize.JSONB },
      location: { type: Sequelize.TEXT },
      duration: { type: Sequelize.TEXT },
      budgetMin: { type: Sequelize.INTEGER },
      budgetMax: { type: Sequelize.INTEGER },
      status: { allowNull: false, type: Sequelize.TEXT, defaultValue: 'open' },
      promoted: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: false },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), onUpdate: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Job');
  }
};
