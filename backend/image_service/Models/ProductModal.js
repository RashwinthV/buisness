const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
    unique: true,
  },

  productName: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  rate: {
    type: Number,
    default: null,
  },

  productType: {
    type: String,
    required: true,
  },

  image: {
    imageUrl: { type: String, default: "" },
    publicId: { type: String, default: "" },
  },

  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },

  createdOn: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Product", productSchema);
