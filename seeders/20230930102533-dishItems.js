'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const dishes = [];

    const numberOfDishes = 50;

    for (let i = 1; i <= numberOfDishes; i++) {
      const dish = {
        itemType: faker.datatype.number({ min: 0, max: 7 }), 
        name: faker.commerce.productName(),
        contains: faker.lorem.sentence(),
        price: parseFloat(faker.commerce.price(5, 30, 2)), 
        calorie: parseFloat(faker.datatype.number({ min: 50, max: 500, precision: 0.01 })), 
        activeStatus: faker.datatype.boolean(),
        quantityPerOrder: faker.datatype.number({ min: 1, max: 5 }),
        dishId: faker.datatype.number({ min: 104, max: 110 }), 
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      dishes.push(dish);
    }

    return queryInterface.bulkInsert('DishItems', dishes, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DishItems', null, {});
  },
};
