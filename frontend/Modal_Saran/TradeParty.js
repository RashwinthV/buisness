const mongoose = require("mongoose");

const tradePartySchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    partyType: {
      type: String,
      required: true,
      enum: ["buyer", "seller", "both"],
    },
    product: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      addressLine1: {
        type: String,
        required: true,
        trim: true,
      },
      addressLine2: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      district: {
        type: String,
        required: true,
        trim: true,
      },
      pincode: {
        type: String,
        required: true,
        trim: true,
      },
    },
    imageUrl: {
      type: String, // Path or URL of uploaded image
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TradeParty", tradePartySchema);
