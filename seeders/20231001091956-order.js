'use strict';

const { faker } = require('@faker-js/faker');
const { uploadImageFromUrl } = require('../utils/imageUpload');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const orders = [];
    const numberOfOrders = 10000;

    for (let i = 1; i <= numberOfOrders; i++) {
      const order = {
        id: i,
        orderId: `OD${String(i).padStart(6, '0')}`,
        customerId: 1,
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        discount: 0,
        total: parseFloat(faker.commerce.price(50, 300, 2)),
        restaurantId: faker.datatype.number({ min: 1, max: 5 }),
        status: faker.datatype.number({ min: 0, max: 6 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const items = [];
      const numberOfItems = faker.datatype.number({ min: 1, max: 5 });

      for (let j = 1; j <= numberOfItems; j++) {
        const imageUrl = faker.image.food();
        const image = await uploadImageFromUrl(imageUrl); // Use await here

        const item = {
          id: faker.datatype.number({ min: 1, max: 10 }),
          image,
          description: faker.lorem.sentence(),
          contains: faker.lorem.sentence(),
          name: `dish${j}`,
          price: parseFloat(faker.commerce.price(5, 30, 2)),
          quantity: faker.datatype.number({ min: 1, max: 5 }),
        };

        items.push(item);
      }

      order.items = JSON.stringify(items); 
      orders.push(order);
    }

    return queryInterface.bulkInsert('Orders', orders, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Orders', null, {});
  },
};
