const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    businessName: {
      type: String,
      required: true,
      trim: true,
    },
    businessEmail: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    addressLine2: {
      type: String,
    },
    businessCity: {
      type: String,
      required: true,
    },
    businessDistrict: {
      type: String,
      required: true,
    },
    businessState: {
      type: String,
      required: true,
    },
    businessCountry: {
      type: String,
      required: true,
    },
    businessZipCode: {
      type: String,
      required: true,
    },
    ownerContact: {
      type: String,
      required: true,
    },
    officeContact: {
      type: String,
    },
    googleMapLink: {
      type: String,
    },
    gstnumber: {
      type: String,
    },
    startedOn: {
      type: Date,
      required: true,
    },
    logo: {
      imageUrl: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    numberVerified: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
