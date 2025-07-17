const mongoose = require("mongoose");

const TradePartySchema = new mongoose.Schema({
  // Name :
  name: {
    type: String,
    required: true,
  },

  // Party Type (buyer, seller, or both) :
  partyType: {
    type: String,
    enum: ["buyer", "seller", "both"],
    required: true,
  },

  // Product Name or Type :
  product: {
    type: String,
    required: true,
  },

  // Address Line 1 :
  addressLine1: {
    type: String,
    required: true,
  },

  // Address Line 2 (optional) :
  addressLine2: {
    type: String,
    default: "",
  },

  // City :
  city: {
    type: String,
    required: true,
  },

  // District :
  district: {
    type: String,
    required: true,
  },

  // Pincode :
  pincode: {
    type: String,
    required: true,
  },

  // Contact Number :
  contact: {
    type: String,
    required: true,
  },

  // Image (optional) :
  image: {
    type: String,
    default: "",
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

module.exports = mongoose.model("tradeparty", TradePartySchema);
