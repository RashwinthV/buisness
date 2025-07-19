const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    type: {
      type: String,
      enum: ["sales", "purchase"],
      required: true,
    },
    partyName: {
      type: String,
      required: true,
    },
    partyContact: {
      type: String,
    },
    entryBy: {
      type: String,
      required: true,
    },
    products: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        rate: { type: Number, required: true },
        total: { type: Number, required: true },
      },
    ],
    grandTotal: {
      type: Number,
      required: true,
    },
    entryDate: {
      type: Date,
      default: Date.now, // auto-set on creation
    },
    updatedBy: {
      type: String,
      required: true,
      default: "N/A",
    },
    updatedOn: {
      type: Date,
      required: true,
      default: "N/A", // auto-set on update
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Transactions", TransactionSchema);
