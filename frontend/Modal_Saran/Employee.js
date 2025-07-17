const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
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
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    doj: {
      type: Date,
      required: true,
    },
    workField: {
      type: String,
      required: true,
      enum: ["driver", "factory_worker", "others"],
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
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
      state: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      zipCode: {
        type: String,
        required: true,
        trim: true,
      },
    },
    idProof: {
      type: String,
      required: true,
      enum: ["aadhar", "voter_id", "pan", "passport", "driving_license"],
    },
    idNumber: {
      type: String,
      required: true,
      trim: true,
    },
    photoUrl: {
      type: String, // URL to stored image (on server, cloudinary, etc.)
      default: "", // Can leave default or set to your placeholder
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);
