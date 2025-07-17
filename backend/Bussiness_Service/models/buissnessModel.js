const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema(
  {
    // Name :
    name: {
      type: String,
      required: true,
    },

    // Business ID :
    businessId: {
      type: Number,
      required: true,
      unique: true,
    },

    // Email :
    email: {
      type: String,
      required: true,
    },

    // Description :
    description: {
      type: String,
      required: true,
    },

    // Owned By :
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

    // Address Line 1 :
    addressLine1: {
      type: String,
      required: true,
    },

    // Address Line 2 :
    addressLine2: {
      type: String,
      default: "",
    },

    // Google Map Link :
    googleMapLink: {
      type: String,
      default: "",
    },

    // Contact Number ( Owner ) :
    contactNumberOwner: {
      type: String,
      required: true,
    },

    // Contact Number ( Office ) :
    contactNumberOffice: {
      type: String,
      default: "",
    },

    // Started on :
    startedOn: {
      type: Date,
      required: true,
    },

    // GST Number (Optional) :
    gstnumber: {
      type: String,
      unique:true,
      default: "",
    },

    // Business City :
    businessCity: {
      type: String,
      required: true,
    },

    // Business District :
    businessDistrict: {
      type: String,
      required: true,
    },

    // Business Zip Code :
    businessZipCode: {
      type: String,
      required: true,
    },

    // Subscription Status :
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

    // Business Logo :
    bussinessLogo: {
      type: String,
      default: "", // or null
    },
     logo: {
      imageUrl: { type: String, default: null },
      publicId: { type: String, default: null },
    },

    // Created on :
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "business",
  }
);

module.exports = mongoose.model("business", BusinessSchema);
