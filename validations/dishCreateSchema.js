const Ajv = require('ajv');

const ajv = new Ajv();

const createDishSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3 },
    description: { type: 'string' },
    contains: { type: 'string' },
    calories: { type: 'string' },
    price: { type: 'string' },
    activeStatus: { type: 'string' },
    quantityPerOrder: { type: 'string' },
    restaurantId: { type: 'string' },
  },
  required: ['name', 'description', 'contains', 'calories', 'price', 'activeStatus', 'quantityPerOrder', 'restaurantId'],
};

const validateCreateDish = ajv.compile(createDishSchema);

module.exports = validateCreateDish;
