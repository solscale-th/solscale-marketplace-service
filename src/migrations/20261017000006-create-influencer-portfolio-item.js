module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InfluencerPortfolioItem', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      influencerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Influencer', key: 'id' },
      },
      title: { allowNull: false, type: Sequelize.TEXT },
      platform: { allowNull: true, type: Sequelize.TEXT },
      imageUrl: { allowNull: true, type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), onUpdate: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('InfluencerPortfolioItem');
  }
};
