module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Influencer', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      email: { allowNull: false, unique: true, type: Sequelize.TEXT },
      password: { allowNull: false, type: Sequelize.TEXT },
      firstName: { allowNull: false, type: Sequelize.TEXT },
      lastName: { allowNull: false, type: Sequelize.TEXT },
      stageName: { type: Sequelize.TEXT },
      age: { type: Sequelize.INTEGER },
      avatarUrl: { type: Sequelize.TEXT },
      platforms: { type: Sequelize.JSONB },
      contentCategories: { type: Sequelize.JSONB },
      languages: { type: Sequelize.JSONB },
      bankName: { type: Sequelize.TEXT },
      bankAccountName: { type: Sequelize.TEXT },
      bankAccountNumber: { type: Sequelize.TEXT },
      otherPhotos: { type: Sequelize.JSONB },
      averageRating: { allowNull: false, type: Sequelize.DECIMAL(3, 2), defaultValue: 0 },
      reviewCount: { allowNull: false, type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), onUpdate: Sequelize.literal('CURRENT_TIMESTAMP') },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Influencer');
  }
};
