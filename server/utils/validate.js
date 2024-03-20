const { ApiError } = require("../error/ApiError");

const validate = (validateValues, next) => {
  if (Object.values(validateValues).some((el) => !el)) {
    const [key] = Object.entries(validateValues).find(([, value]) => !value);
    return next(
      ApiError.badRequest(`Поле '${key}' является обязательным для товара`)
    );
  }

  return true;
};

module.exports = validate;
