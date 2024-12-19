const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    next();
  } catch (error) {
    res.status(400).json({ ok: false, errors: error.array() });
  }
};

module.exports = {
  validateResults,
};
