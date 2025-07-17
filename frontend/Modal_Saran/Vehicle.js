const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    imageUrl: {
      type: String, // URL or path to the uploaded vehicle image
      default: "",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Assuming each vehicle is uniquely registered
    },
    registeredOwnerName: {
      type: String,
      required: true,
      trim: true,
    },
    rtoDetails: {
      type: String,
      required: true,
      trim: true,
    },
    registrationDate: {
      type: Date,
      required: true,
    },
    ownership: {
      type: String,
      required: true,
      enum: ["first", "second", "third", "others"],
    },
    insuranceValidTill: {
      type: Date,
    },
    fcValidTill: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
