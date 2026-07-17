module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Engagement', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      applicationId: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER,
        references: { model: 'Application', key: 'id' },
      },
      jobId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Job', key: 'id' },
      },
      influencerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Influencer', key: 'id' },
      },
      workStatus: { allowNull: false, type: Sequelize.TEXT, defaultValue: 'not_submitted' },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), onUpdate: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Engagement');
  }
};
