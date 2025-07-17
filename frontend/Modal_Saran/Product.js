const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
      trim: true,
    },
    rate: {
      type: Number,
      default: 0,
      min: 0,
    },
    type: {
      type: String,
      required: true,
      enum: ["raw_material", "finished_product"],
    },
    imageUrl: {
      type: String, // e.g., URL to uploaded image
      default: "", // Can be default placeholder image path
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
