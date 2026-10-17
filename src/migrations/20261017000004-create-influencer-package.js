module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InfluencerPackage', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      influencerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Influencer', key: 'id' },
      },
      tier: { allowNull: false, type: Sequelize.TEXT },
      platform: { allowNull: true, type: Sequelize.TEXT },
      price: { allowNull: false, type: Sequelize.INTEGER },
      includes: { allowNull: true, type: Sequelize.JSONB },
      revisions: { allowNull: false, type: Sequelize.INTEGER, defaultValue: 0 },
      turnaroundDays: { allowNull: false, type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), onUpdate: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('InfluencerPackage');
  }
};
