module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Influencer', 'countryCode', { allowNull: true, type: Sequelize.TEXT });
    await queryInterface.addColumn('Influencer', 'phone', { allowNull: true, type: Sequelize.TEXT });
    await queryInterface.addColumn('Influencer', 'bio', { allowNull: true, type: Sequelize.TEXT });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Influencer', 'countryCode');
    await queryInterface.removeColumn('Influencer', 'phone');
    await queryInterface.removeColumn('Influencer', 'bio');
  }
};
