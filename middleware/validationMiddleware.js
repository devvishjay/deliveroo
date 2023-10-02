// validationMiddleware.js
const validateLoginUser = require('../validations/userLoginSchema.js');
const validateUser = require('../validations/userRegisterSchema.js');
const validateLoginCustomer = require('../validations/customerLoginSchema.js');
const validateCustomer = require('../validations/customerRegisterSchema.js');
const validateCreateRestaurant =  require('../validations/restaurantCreateSchema.js');
const validateCreateDish = require('../validations/dishCreateSchema.js');
const validateCreateDishItem= require('../validations/dishItemCreateSchema.js');

function validateUserData(req, res, next) {
  const isValid = validateUser(req.body);

  if (!isValid) {
    const errorMessages = validateUser.errors.map((error) => {
      return {
        field: error.params.missingProperty,
        message: error.message,
      };
    });

    return res.status(400).json({ errors: errorMessages });
  }

  next();
}

function validateUserLoginData(req, res, next) {
  const isValid = validateLoginUser(req.body);

  if (!isValid) {
    const errorMessages = validateLoginUser.errors.map((error) => {
      return {
        field: error.params.missingProperty,
        message: error.message,
      };
    });

    return res.status(400).json({ errors: errorMessages });
  }

  next();
}

function validateCustomerData(req, res, next) {
  const isValid = validateCustomer(req.body);

  if (!isValid) {
    const errorMessages = validateCustomer.errors.map((error) => {
      return {
        field: error.params.missingProperty,
        message: error.message,
      };
    });

    return res.status(400).json({ errors: errorMessages });
  }

  next();
}

function validateCustomerLoginData(req, res, next) {
  const isValid = validateLoginCustomer(req.body);

  if (!isValid) {
    const errorMessages = validateLoginCustomer.errors.map((error) => {
      return {
        field: error.params.missingProperty,
        message: error.message,
      };
    });

    return res.status(400).json({ errors: errorMessages });
  }

  next();
}


function validateCreateRestaurantData(req, res, next) {
  const isValid = validateCreateRestaurant(req.body);

  if (!isValid) {
    const errorMessages = validateCreateRestaurant.errors.map((error) => {
      return {
        field: error.params.missingProperty,
        message: error.message,
      };
    });

    return res.status(400).json({ errors: errorMessages });
  }

  next();
}
function validateCreateDishData(req, res, next) {
  const isValid = validateCreateDish(req.body);

  if (!isValid) {
    const errorMessages = validateCreateDish.errors.map((error) => {
      return {
        field: error.params.missingProperty,
        message: error.message,
      };
    });

    return res.status(400).json({ errors: errorMessages });
  }

  next();
}

function validateCreateDishItemData(req, res, next) {
  const isValid = validateCreateDishItem(req.body);

  if (!isValid) {
    const errorMessages = validateCreateDishItem.errors.map((error) => {
      return {
        field: error.params.missingProperty,
        message: error.message,
      };
    });

    return res.status(400).json({ errors: errorMessages });
  }

  next();
}



module.exports = {validateUserData, validateUserLoginData, validateCustomerData, validateCustomerLoginData, validateCreateRestaurantData, validateCreateDishData, validateCreateDishItemData};
