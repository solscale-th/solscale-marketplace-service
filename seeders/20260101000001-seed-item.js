module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Item', [
      { name: 'Example Item', description: 'Seeded via sequelize-cli', price: 9.99, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Item', null, {});
  }
};
