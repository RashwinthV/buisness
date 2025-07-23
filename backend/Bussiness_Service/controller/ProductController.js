const { deleteImage } = require("../../image_service/controller/ProductImage");
const businessModel = require("../models/buissnessModel");
const ProductModel = require("../models/ProductModal");
const mongoose = require("mongoose");

exports.RegisterProduct = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { productName, description, imageUrl, rate, productType, public_id } =
      req.body;

    // Validate required fields
    if (
      !productName ||
      !description ||
      !imageUrl ||
      !rate ||
      !productType ||
      !public_id
    ) {
      return res.status(400).json({
        message:
          "Please fill all fields to register product, including public_id",
      });
    }

    // Check if business exists
    const business = await businessModel.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: "Business not found!" });
    }

    // Check if product already exists for this business
    const existingProduct = await ProductModel.findOne({
      productName,
      businessId,
    });

    if (existingProduct) {
      return res.status(409).json({
        message: "Product already exists for this business",
      });
    }

    // Generate numeric productId
    const lastProduct = await ProductModel.findOne().sort({ createdOn: -1 });

    let newProductId = "PROD1";

    if (lastProduct && lastProduct.productId) {
      const lastNumber =
        parseInt(lastProduct.productId.replace("PROD", ""), 10) || 0;
      newProductId = "PROD" + (lastNumber + 1);
    }

    // Create new product
    const newProduct = new ProductModel({
      productId: newProductId,
      businessId,
      productName,
      description,
      rate,
      productType,
      image: {
        imageUrl,
        publicId: public_id,
      },
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product registered successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("RegisterProduct Error:", error);

    if (req.body.public_id) {
      try {
        await deleteImage(req.body.public_id);
        console.log("Rolled back image from Cloudinary");
      } catch (imgErr) {
        console.error("Image rollback failed:", imgErr);
      }
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.GetProducts = async (req, res) => {
  try {
    const { businessId } = req.params;

    if (!businessId || !mongoose.Types.ObjectId.isValid(businessId)) {
      return res
        .status(400)
        .json({ message: "Invalid or missing business ID" });
    }

    const products = await ProductModel.find({ businessId });
    const allproducts=await ProductModel.find()
    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ message: "No products found for this business" });
    }
return res.status(200).json({
  products,
  totalbusinessProducts: products.length,
  allproducts:allproducts.length
});
  } catch (error) {
    console.error("Product fetching error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.UpdateProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { productName, rate, productType } = req.body;

    if (!productName || !productType) {
      return res.status(400).json({
        success: false,
        message: "Product name and type are required.",
      });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
     { _id:productId},
      {
        productName,
        rate,
        productType,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product details:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};
