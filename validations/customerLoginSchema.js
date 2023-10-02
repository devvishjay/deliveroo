// userSchema.js
const Ajv = require('ajv');

const ajv = new Ajv();

ajv.addFormat('email', (email) => {
  const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailPattern.test(email);
});



const customerLoginSchema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
  },
  required: ['email', 'password'],
};



const validateLoginCustomer = ajv.compile(customerLoginSchema);


module.exports = validateLoginCustomer;
