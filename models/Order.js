
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define("Orders", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    orderId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    customerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Customers",
        key: "id",
      },
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    items: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    total: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    discount: {
      type: Sequelize.FLOAT,
    },
    restaurantId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Restaurants",
        key: "id",
      },
    },
    status: {
      type: Sequelize.INTEGER,  // 0 : placed 1: accpeted 2: preparing 3. Ready to Delivery 4. Pickuped 5. Inprogress 6: delivered 7. Cancelled
      defaultValue: 0
    },
  });

  orders.associate = function (models) {
    orders.belongsTo(models.Customers, { foreignKey: "customerId" });
    orders.belongsTo(models.Restaurants, { foreignKey: "restaurantId" });
  };
  return orders
};
