const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  // Name :
  name: {
    type: String,
    required: true,
  },

  // Description :
  description: {
    type: String,
    required: true,
  },

  // Rate ( optional ) :
  rate: {
    type: Number,
    default: null,
  },

  // Product Type :
  type: {
    type: String,
    required: true,
  },

  // Image ( Optional ) :
  image: {
    type: String,
    default: "", // can be a URL or filename
  },

  // Business ID :
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
    required: true,
  },

  // Created On :
  createdOn: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("product", ProductSchema);
