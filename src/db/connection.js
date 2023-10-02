const Sequelize = require('sequelize');

const sequelize = new Sequelize("deliveroo", 'root', 'Root123456', {host: 'localhost', dialect: 'mysql', operatorsAliases: false});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = sequelize;
global.sequelize = sequelize;
