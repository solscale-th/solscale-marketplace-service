module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InfluencerReview', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      influencerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Influencer', key: 'id' },
      },
      entrepreneurId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Entrepreneur', key: 'id' },
      },
      engagementId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'Engagement', key: 'id' },
      },
      rating: { allowNull: false, type: Sequelize.INTEGER },
      comment: { allowNull: true, type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), onUpdate: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    await queryInterface.addIndex('InfluencerReview', {
      name: 'influencer_review_influencer_id',
      fields: ['influencerId'],
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('InfluencerReview');
  }
};
