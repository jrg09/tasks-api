//rutas de host + /api/encuestas
const { Router } = require("express");
const { getCategories } = require("../controllers/categories");

const router = Router();

router.get("/", getCategories);

module.exports = router;
