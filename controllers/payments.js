const Payments = require("../models/payments");

const getPayments = async (req, res) => {
  const userId = req.headers["user-id"];
  console.log({ m: "getPayments", userId });

  try {
    const data = await Payments.find({ userId });
    res.json({ ok: true, data });
  } catch (error) {
    return res.status(501).json({ ok: false, msg: "Ocurrió un error al generar el listado de payments." });
  }
};

const createPayment = async (req, res) => {
  try {
    const userId = req.headers["user-id"];
    let payment = req.body;
    console.log({ m: "createPayment", userId, payment });

    payment.done = false;
    payment.due = !!payment.due ? payment.due : null;
    payment.paymentDate = null;
    payment.category = !!payment.category ? payment.category : "Todos";
    payment.userId = userId;

    let createdPayment = await Payments.create(payment);

    if (!createdPayment) {
      return res.status(404).json({
        ok: false,
        message: "Problem creating payment",
        payment: null,
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Successfully created payment",
      payment: createdPayment,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

const updatePayment = async (req, res) => {
  try {
    const payment = req.body;
    console.log({ m: "updatePayment", payment });

    const update = await Payments.findOneAndUpdate({ _id: req.params.id }, payment);

    if (!update) {
      return res.status(404).json({
        ok: false,
        message: "Not successfully updated",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Payment successfully updated",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

const togglePayment = async (req, res) => {
  console.log({ m: "togglePayment", id: req.params.id });

  try {
    const payment = await Payments.findOne({ _id: req.params.id });

    if (!payment) {
      return res.status(404).json({
        ok: false,
        message: "Payment not found",
      });
    }

    payment.done = !payment.done;
    payment.paymentDate = payment.done ? new Date() : null;

    await payment.save();

    return res.status(200).json({
      ok: true,
      message: "Payment successfully toggled",
      payment,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

const deletePayment = async (req, res) => {
  console.log({ m: "deletePayment", id: req.params.id });

  try {
    const deletePayment = await Payments.findOneAndDelete({ _id: req.params.id });

    if (!deletePayment) {
      return res.status(404).json({
        ok: false,
        message: "Payment not found",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Payment successfully deleted",
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = { getPayments, createPayment, updatePayment, togglePayment, deletePayment };
