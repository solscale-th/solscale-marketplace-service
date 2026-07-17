module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Submission', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      engagementId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Engagement', key: 'id' },
      },
      links: { type: Sequelize.JSONB },
      note: { type: Sequelize.TEXT },
      status: { allowNull: false, type: Sequelize.TEXT, defaultValue: 'pending_review' },
      reviewNote: { type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), onUpdate: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Submission');
  }
};
