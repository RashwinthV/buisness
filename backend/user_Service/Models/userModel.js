const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    login: {
      type: String,
      enum: ["Manual", "Social"],
      default: "Manual",
      required: true,
    },
    Role: {
      type: String,
      enum: ["Owner", "Manager", "user"],
      default: "user",
    },
    dob: {
      type: Date,
      min: 0,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    profilepic: {
      imageUrl: { type: String, default: null },
      publicId: { type: String, default: null },
    },
    phoneNo: {
      type: String,
      unique: true,
    },
    address: {
      line1: { type: String, default: "" },
      line2: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "" },
      pincode: { type: String, default: "" },
    },
    otp: {
      type: String,
      default: null,
    },
    newsSubscription: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
