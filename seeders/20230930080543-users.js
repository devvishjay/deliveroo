'use strict';
const { faker } = require('@faker-js/faker');
const { QueryTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = {
        name: faker.company.name(), 
        password:"Test@123456",
        email: faker.internet.email() 
      };
      users.push(user);
    }

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});

  }
};
