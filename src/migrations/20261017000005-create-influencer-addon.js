module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InfluencerAddon', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      influencerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Influencer', key: 'id' },
      },
      kind: { allowNull: false, type: Sequelize.TEXT },
      price: { allowNull: false, type: Sequelize.INTEGER },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), onUpdate: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('InfluencerAddon');
  }
};
