'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('DishItems', {
      id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    itemType:{
        type:Sequelize.INTEGER,
        default: 0 // 0: basic, 1: Drink, 2: Dessert 3: First Base 4: Second Base 5: Third Base 6: Protein 7: Snack 
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    contains:{
        type:Sequelize.TEXT,
        allowNull:false,
    },    
    price:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    calorie:{
        type:Sequelize.FLOAT,
        allowNull:false
    },
    activeStatus: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true, 
      },
    quantityPerOrder:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    dishId:{
        type: Sequelize.INTEGER,
        allowNull: false,
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

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('DishItems');

  }
};
