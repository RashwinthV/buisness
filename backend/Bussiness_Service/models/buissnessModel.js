const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    ownedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    // Managers :
    managers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    businessId: {
      type: Number,
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
    subscriptionStatus: {
      type: String,
      enum: ["Regular", "Prime"],
      default: "Regular",
    },

    // Business Status :
    businessStatus: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    SocialLinks: {
      facebook: { type: String, default: null },
      instagram: { type: String, default: null },
      linkedin: { type: String, default: null },
      twitter: { type: String, default: null },
      website: { type: String, default: null },
    },
  },
  {
    timestamps: true,
    collection: "business",
  }
);

module.exports = mongoose.model("business", businessSchema);
