'use strict';
const { faker } = require('@faker-js/faker');
const { QueryTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const category = [];
    const categories = [
      'New daily Specials',
      'Salads',
      'Hot Power Bowls',
      'Bundles',
      'Vegan Menu',
      'Rainbow Wraps',
      'Snacks & Sides',
      'Cold Drinks',
      'Yoghurt & fruit',
      'Smoothies, shakes & juice'
    ];
    for (let i = 0; i < categories.length; i++) {
      const categoryItem = {
        name: categories[i], 
      };
      category.push(categoryItem);
    }

    await queryInterface.bulkInsert('DishCategories', category, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DishCategories', null, {});

  }
};
