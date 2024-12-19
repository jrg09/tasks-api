const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema for todo
const PaymentScheme = new Schema(
  {
    name: {
      type: String,
    },
    ammount: {
      type: Number,
    },
    done: {
      type: Boolean,
      default: false,
    },
    due: {
      type: Date,
    },
    paymentDate: {
      type: Date,
    },
    category: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//create model for todo
module.exports = mongoose.model("Payments", PaymentScheme);
