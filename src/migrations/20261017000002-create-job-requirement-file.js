module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JobRequirementFile', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      jobId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Job', key: 'id' },
      },
      kind: { allowNull: false, type: Sequelize.TEXT },
      required: { allowNull: false, type: Sequelize.BOOLEAN, defaultValue: false },
      fileUrl: { allowNull: true, type: Sequelize.TEXT },
      originalFilename: { allowNull: true, type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), onUpdate: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('JobRequirementFile');
  }
};
