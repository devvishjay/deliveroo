'use strict';
const { faker } = require('@faker-js/faker');
const { QueryTypes } = require('sequelize');
const { uploadImageFromUrl } = require('../utils/imageUpload');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const restaurants = [];
    for (let i = 0; i < 10; i++) {
      const restaurant = {
        name: faker.company.name(), 
        createdAt: new Date(),
        updatedAt: new Date(),
        openTime: "09:00 AM",
        closeTime: "10:00 PM",
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        country: faker.address.country(),
        longitute: faker.address.longitude(),
        latitute: faker.address.latitude(),
        deliveryRatePerMile: faker.datatype.float({ min: 1, max: 10 }), 
        userId: faker.datatype.number({ min: 1, max: 3 }), 
        tags: JSON.stringify(['Chicken', 'Salads', 'Healthy']), 
        bannerImage: await uploadImageFromUrl(faker.image.food()), 
        activeStatus: true,
      };
      restaurants.push(restaurant);
    }

    await queryInterface.bulkInsert('Restaurants', restaurants, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Restaurants', null, {});

  }
};
