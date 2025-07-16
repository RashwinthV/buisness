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

    // Address Lane 1 :
    addressLine1: {
      type: String,
      required: true,
    },

    // Address Lane 2 :
    addressLine2: {
      type: String,
      default: "",
    },

    // Google Map Link :
    googleMapLink: {
      type: String,
      default: "",
    },

    // Contact Number ( Owner ) : -- to be fetched from user model
    contactNumberOwner: {
      type: String,
      required: true, // should be set manually on creation
    },

    // Contact Number ( Office ) :
    contactNumberOffice: {
      type: String,
      default: "",
    },

    // Started on : (Actual Inaugurated Date)
    startedOn: {
      type: Date,
      required: true,
    },

    // Subscription Status : ( Regular / Prime )
    subscriptionStatus: {
      type: String,
      enum: ["Regular", "Prime"],
      default: "Regular",
    },

    // Business Status : ( Active / Inactive )
    businessStatus: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    // Created on : (creation date in site)
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "business", // 👈 ADD THIS
  }
);

module.exports = mongoose.model("business", BusinessSchema);
