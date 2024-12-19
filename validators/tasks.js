const { check } = require("express-validator");
const { validateResults } = require("../middleware/handleValidator");

const validatorCreateTask = [
  check("name", "Name is required").exists().notEmpty().isLength({ min: 3, max: 90 }).escape(),
  check("category").escape(),
  check("type").escape(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateTask };
