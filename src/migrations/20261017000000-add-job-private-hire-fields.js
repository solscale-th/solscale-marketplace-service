module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Job', 'visibility', { allowNull: false, type: Sequelize.TEXT, defaultValue: 'public' });
    await queryInterface.addColumn('Job', 'influencerId', {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: { model: 'Influencer', key: 'id' },
    });
    await queryInterface.addColumn('Job', 'postingDate', { allowNull: true, type: Sequelize.DATEONLY });
    await queryInterface.addColumn('Job', 'languages', { allowNull: true, type: Sequelize.JSONB });
    await queryInterface.addColumn('Job', 'caption', { allowNull: true, type: Sequelize.TEXT });
    await queryInterface.addColumn('Job', 'requiredMessage', { allowNull: true, type: Sequelize.TEXT });
    await queryInterface.addColumn('Job', 'forbiddenMessage', { allowNull: true, type: Sequelize.TEXT });
    await queryInterface.addColumn('Job', 'packageName', { allowNull: true, type: Sequelize.TEXT });
    await queryInterface.addColumn('Job', 'packageDetail', { allowNull: true, type: Sequelize.TEXT });
    await queryInterface.addColumn('Job', 'packagePrice', { allowNull: true, type: Sequelize.INTEGER });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Job', 'visibility');
    await queryInterface.removeColumn('Job', 'influencerId');
    await queryInterface.removeColumn('Job', 'postingDate');
    await queryInterface.removeColumn('Job', 'languages');
    await queryInterface.removeColumn('Job', 'caption');
    await queryInterface.removeColumn('Job', 'requiredMessage');
    await queryInterface.removeColumn('Job', 'forbiddenMessage');
    await queryInterface.removeColumn('Job', 'packageName');
    await queryInterface.removeColumn('Job', 'packageDetail');
    await queryInterface.removeColumn('Job', 'packagePrice');
  }
};
