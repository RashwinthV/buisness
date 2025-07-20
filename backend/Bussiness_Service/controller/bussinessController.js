const mongoose = require("mongoose");
const bussinessModel = require("../models/buissnessModel");
const userModel = require("../models/userModel");
const ProductModal = require("../models/ProductModal");

exports.Getbussiness = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    const userId = new mongoose.Types.ObjectId(id);

    const businesses = await bussinessModel.find({ ownedBy: userId });

    if (!businesses || businesses.length === 0) {
      return res.status(404);
      // .json({ message: "No businesses found for this user" });
    }

    res.status(200).json(businesses);
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.RegisterBusiness = async (req, res) => {
  try {
    const {
      businessName,
      businessEmail,
      description,
      addressLine1,
      addressLine2,
      googleMapLink,
      ownerContact,
      officeContact,
      startedOn,
      gstnumber,
      businessCity,
      businessDistrict,
      businessState,
      businessCountry,
      businessZipCode,
      logo,
    } = req.body;

    const requiredFields = [
      businessName,
      businessEmail,
      addressLine1,
      businessCity,
      businessDistrict,
      businessState,
      businessCountry,
      businessZipCode,
      ownerContact,
      startedOn,
    ];

    if (requiredFields.some((field) => !field)) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields." });
    }

    const { id } = req.params;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Ensure Role is 'Owner'
    if (user.Role !== "Owner") {
      user.Role = "Owner";
      await user.save();
    }

    // Auto-increment businessId logic (optional)
    const lastBusiness = await bussinessModel
      .findOne()
      .sort({ businessId: -1 });
    const newBusinessId = lastBusiness ? lastBusiness.businessId + 1 : 1001;

    const newBusiness = new bussinessModel({
      ownedBy: id, // 🔄 Use 'userId' as defined in schema
      businessName,
      businessEmail,
      businessId: newBusinessId,
      description,
      addressLine1,
      addressLine2,
      googleMapLink,
      ownerContact,
      officeContact,
      startedOn,
      gstnumber,
      businessCity,
      businessDistrict,
      businessState,
      businessCountry,
      businessZipCode,
      logo: {
        imageUrl: logo?.imageUrl || "",
        publicId: logo?.publicId || "",
      },
    });

    const savedBusiness = await newBusiness.save();

    return res.status(201).json({
      message: "Business registered successfully",
      business: savedBusiness,
    });
  } catch (error) {
    console.error("Business registration error:", error.message);
    return res.status(500).json({
      message: "Server error during business registration",
      error: error.message,
    });
  }
};

exports.GetAllbussiness = async (req, res) => {
  try {
    const allbusinesses = await bussinessModel.find().populate({
      path: "ownedBy",
      select: "firstName profilepic", // only these fields from User
    });

    if (allbusinesses.length === 0) {
      return res.json({ message: "No businesses found" });
    }

    // For each business, add the totalProductCount field
    const businessesWithProductCount = await Promise.all(
      allbusinesses.map(async (business) => {
        const totalProducts = await ProductModal.countDocuments({
          businessId: business._id,
        });
        return {
          ...business._doc,
          totalProducts,
        };
      })
    );

    return res.status(200).json(businessesWithProductCount);
  } catch (error) {
    console.error("Business fetch error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

exports.UpadateBussiness = async (req, res) => {
  const { businessId } = req.params;
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const business = await bussinessModel.findById(businessId);
    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found" });
    }
    if (String(business.ownedBy) !== String(userId)) {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized to update this business",
        });
    }

    Object.assign(business, updateData);

    await business.save();

    return res
      .status(200)
      .json({
        success: true,
        message: "Business updated successfully",
        business,
      });
  } catch (err) {
    console.error("Business update error:", err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
