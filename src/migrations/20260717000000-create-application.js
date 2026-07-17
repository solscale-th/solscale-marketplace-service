module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Application', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
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
      source: { allowNull: false, type: Sequelize.TEXT },
      status: { allowNull: false, type: Sequelize.TEXT, defaultValue: 'pending' },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), onUpdate: Sequelize.literal('CURRENT_TIMESTAMP') },
    });

    // Partial unique index: only one *active* (pending/accepted) pipeline
    // entry per job+influencer at a time. Withdrawn/rejected/declined rows
    // don't block a later re-application or a fresh invite for the same pair.
    await queryInterface.addIndex('Application', {
      name: 'application_job_id_influencer_id_key',
      unique: true,
      fields: ['jobId', 'influencerId'],
      where: { status: { [Sequelize.Op.in]: ['pending', 'accepted'] } },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Application');
  }
};
