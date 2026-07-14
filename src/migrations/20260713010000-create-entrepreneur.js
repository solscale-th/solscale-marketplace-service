module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Entrepreneur', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      email: { allowNull: false, unique: true, type: Sequelize.TEXT },
      password: { allowNull: false, type: Sequelize.TEXT },
      companyName: { allowNull: false, type: Sequelize.TEXT },
      brandDescription: { type: Sequelize.TEXT },
      logoUrl: { type: Sequelize.TEXT },
      bankName: { type: Sequelize.TEXT },
      bankAccountName: { type: Sequelize.TEXT },
      bankAccountNumber: { type: Sequelize.TEXT },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), onUpdate: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Entrepreneur');
  }
};
