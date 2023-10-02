// userSchema.js
const Ajv = require('ajv');

const ajv = new Ajv();

ajv.addFormat('email', (email) => {
  const emailPattern = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailPattern.test(email);
});


const userSchema = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
  },
  required: ['name', 'email', 'password'],
};




const validateUser = ajv.compile(userSchema);


module.exports = validateUser;
