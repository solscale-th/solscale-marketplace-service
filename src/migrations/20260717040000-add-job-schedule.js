module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Job', 'startAt', { allowNull: true, type: Sequelize.DATE });
    await queryInterface.addColumn('Job', 'endAt', { allowNull: true, type: Sequelize.DATE });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Job', 'startAt');
    await queryInterface.removeColumn('Job', 'endAt');
  }
};
