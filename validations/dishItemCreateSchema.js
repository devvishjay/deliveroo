const Ajv = require('ajv');

const ajv = new Ajv();

const createDishItemSchema = {
  type: 'object',
  properties: {
    itemType: { type: 'integer' },
    name: { type: 'string', minLength: 3 },
    contains: { type: 'string' },
    price: { type: 'number' },
    calorie: { type: 'number' },
    activeStatus: { type: 'boolean' },
    quantityPerOrder: { type: 'integer' },
    dishId: { type: 'integer' },
  },
  required: ['itemType', 'name', 'contains', 'price', 'calorie', 'quantityPerOrder', 'dishId'],
};

const validateCreateDishItem = ajv.compile(createDishItemSchema);

module.exports = validateCreateDishItem;
