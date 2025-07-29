const buissnessModel = require("../models/buissnessModel");

exports.AddCategory = async (req, res) => {
  const { businessId, type } = req.params;
  const { tags } = req.body;

  try {
    const validTypes = {
      employee: "employeeFieldsOfWork",
      vehicle: "vehicleCategories",
      product: "productCategories",
      trade: "tradePartyTypes",
    };

    const tagField = validTypes[type.toLowerCase()];
    if (!tagField) {
      return res.status(400).json({ error: "Invalid type provided" });
    }

    // 1. Find the business document
    const business = await buissnessModel.findById(businessId);
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    // 2. Check if tags are the same (to avoid unnecessary update)
    const existingTags = business[tagField] || [];

    const areSame =
      existingTags.length === tags.length &&
      existingTags.every((tag) => tags.includes(tag));
      console.log(areSame);
      

    if (areSame) {
      return res.status(200).json({ message: "tags Already exists", tags: existingTags });
    }

    // 3. Update the tags field if there's a difference
    business[tagField] = tags;
    await business.save();

    return res.status(200).json({ message: `${type} ${validTypes[type]} updated successfully`, tags });
  } catch (err) {
    console.error("AddCategory error:", err);
    return res.status(500).json({ error: "Failed to update tags" });
  }
};


exports.DeleteCategory = async (req, res) => {};
