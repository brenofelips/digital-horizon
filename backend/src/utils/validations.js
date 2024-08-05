export const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validateRequestBody = (requiredProps, body) => {
  const errors = [];

  requiredProps.forEach((prop) => {
    if (!Object.prototype.hasOwnProperty.call(body, prop)) {
      errors.push({ path: prop, message: `${prop} is required!` });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const checkUserLogin = (user, password) => !user || !user.comparePassword(password)
