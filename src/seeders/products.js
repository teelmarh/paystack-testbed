/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('products', [{
         name: 'Product A',
         amount: 15.75,
         created_at: new Date()
       },
       {
         name: 'Product B',
         amount: 550.00,
         created_at: new Date()
       },
       {
        name: 'Product C',
        amount: 10.00,
        created_at: new Date()
      }], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('products', null, {});

  }
};

