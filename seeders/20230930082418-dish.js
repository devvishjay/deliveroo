'use strict';

const { faker } = require('@faker-js/faker');
const { uploadImageFromUrl } = require('../utils/imageUpload');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dishes = [];

    // Define the number of dishes you want to seed
    const numberOfDishes = 100;

    for (let i = 1; i <= numberOfDishes; i++) {
      const dish = {
        name: faker.lorem.words(2), 
        description: faker.lorem.sentence(), 
        contains: faker.lorem.words(5), 
        calories: faker.datatype.number({ min: 50, max: 1000 }), 
        category: faker.datatype.number({ min: 1, max: 10 }),
        price: faker.datatype.number({ min: 5, max: 50, precision: 0.01 }), 
        image: await uploadImageFromUrl(faker.image.food()), 
        activeStatus: true, 
        quantityPerOrder: faker.datatype.number({ min: 1, max: 10 }),
        restaurantId: faker.datatype.number({ min: 1, max: 2 }), 
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      dishes.push(dish);
    }

    return queryInterface.bulkInsert('Dishes', dishes, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Dishes', null, {});
  },
};
