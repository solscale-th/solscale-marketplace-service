module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Influencer', 'googleId', { allowNull: true, unique: true, type: Sequelize.TEXT });
    await queryInterface.changeColumn('Influencer', 'password', { allowNull: true, type: Sequelize.TEXT });

    await queryInterface.addColumn('Entrepreneur', 'googleId', { allowNull: true, unique: true, type: Sequelize.TEXT });
    await queryInterface.changeColumn('Entrepreneur', 'password', { allowNull: true, type: Sequelize.TEXT });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Influencer', 'password', { allowNull: false, type: Sequelize.TEXT });
    await queryInterface.removeColumn('Influencer', 'googleId');

    await queryInterface.changeColumn('Entrepreneur', 'password', { allowNull: false, type: Sequelize.TEXT });
    await queryInterface.removeColumn('Entrepreneur', 'googleId');
  }
};
