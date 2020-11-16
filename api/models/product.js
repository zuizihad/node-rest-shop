const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, erquired: true },
  price: { type: Number, erquired: true },
});

module.exports = mongoose.model("Product", productSchema);
