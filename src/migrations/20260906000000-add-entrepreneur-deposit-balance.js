module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Entrepreneur', 'depositBalance', { allowNull: false, type: Sequelize.INTEGER, defaultValue: 0 });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Entrepreneur', 'depositBalance');
  }
};
