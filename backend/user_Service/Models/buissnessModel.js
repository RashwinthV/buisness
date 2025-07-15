const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  businessId: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", 
    required: true,
  },
  managers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
  },
  googleMapLink: {
    type: String,
  },
  contactNumberOwner: {
    type: String,
  },
  contactNumberOffice: {
    type: String,
  },
  startedOn: {
    type: Date, 
  },
  subscriptionStatus: {
    type: String,
    enum: ["Regular", "Prime"],
    default: "Regular",
  },
  businessStatus: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  productCount: {
    type: Number,
    default: 0,
  },
  employeeCount: {
    type: Number,
    default: 0,
  },
  vehicleCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("business", BusinessSchema);
