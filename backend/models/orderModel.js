const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    // _id:{ type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: String, required: true },
    total : { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
