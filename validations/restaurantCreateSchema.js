const Ajv = require('ajv');

const ajv = new Ajv();

const createRestaurantSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3 },
    openTime: { type: 'string' }, 
    closeTime: { type: 'string' }, 
    address: { type: 'string' },
    city: { type: 'string' },
    country: { type: 'string' },
    longitude: { type: 'string' },
    latitude: { type: 'string' },
  },
  required: ['name', 'address', 'city', 'country'],
};

const validateCreateRestaurant = ajv.compile(createRestaurantSchema);

module.exports = validateCreateRestaurant;
