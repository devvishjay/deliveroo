'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('Restaurants', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      openTime:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      closeTime:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      address:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      city:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      country:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      longitute:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      latitute:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      deliveryRatePerMile:{
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tags:{
        type: Sequelize.JSON,
      },
      bannerImage:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      activeStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true, 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
     })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('Restaurants');

  }
};
