/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('users', [{
         name: 'testuser1',
         password: 'hashed_password', 
         created_at: new Date()
       },
       {
        name: 'testuser2',
        password: 'hashed_password2',
        created_at: new Date()
      }], {});

  },

  async down (queryInterface, Sequelize) {

     await queryInterface.bulkDelete('users', null, {});

  }
};

