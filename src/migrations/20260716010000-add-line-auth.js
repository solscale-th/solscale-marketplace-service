module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Influencer', 'lineId', { allowNull: true, unique: true, type: Sequelize.TEXT });
    await queryInterface.changeColumn('Influencer', 'email', { allowNull: true, type: Sequelize.TEXT });

    await queryInterface.addColumn('Entrepreneur', 'lineId', { allowNull: true, unique: true, type: Sequelize.TEXT });
    await queryInterface.changeColumn('Entrepreneur', 'email', { allowNull: true, type: Sequelize.TEXT });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Influencer', 'email', { allowNull: false, type: Sequelize.TEXT });
    await queryInterface.removeColumn('Influencer', 'lineId');

    await queryInterface.changeColumn('Entrepreneur', 'email', { allowNull: false, type: Sequelize.TEXT });
    await queryInterface.removeColumn('Entrepreneur', 'lineId');
  }
};
