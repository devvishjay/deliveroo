const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Restaurants = sequelize.define("Restaurants",{
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
      tags:{
        type: Sequelize.JSON,
      },
      bannerImage:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
         activeStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: true, 
      },
});

Restaurants.associate= function(models){
  Restaurants.belongsTo(models.Users, { foreignKey: "userId" });
};
return Restaurants
};