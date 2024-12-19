//rutas de host + /api/payments
const { Router } = require("express");
const { getPayments, createPayment, updatePayment, togglePayment, deletePayment } = require("../controllers/payments");
const { validatorCreatePayment } = require("../validators/payments");
const router = Router();

router.get("/", getPayments);
router.post("/", validatorCreatePayment, createPayment);
router.put("/:id", updatePayment);
router.patch("/:id", togglePayment);
router.delete("/:id", deletePayment);

module.exports = router;
