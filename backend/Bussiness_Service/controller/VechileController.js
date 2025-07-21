const Vehicle = require("../models/vechileModel"); // Make sure this path is correct

const generateVehicleId = async (businessId) => {
  let next = 1;
  let vehicleId = "";

  while (true) {
    vehicleId = `VEH${String(next).padStart(3, "0")}`;

    const existing = await Vehicle.findOne({ businessId, vehicleId });

    if (!existing) {
      return vehicleId;
    }

    next++;
  }
};

exports.RegisterVechile = async (req, res) => {
  try {
    const {
      businessId,
      image = {},
      name,
      model,
      brand,
      registrationNumber,
      registeredOwnerName,
      rtoDetails,
      registrationDate,
      ownership,
      insuranceValidTill,
      fcValidTill,
    } = req.body;

    // ✅ Validation: Check required fields
    if (
      !businessId ||
      !name ||
      !model ||
      !brand ||
      !registrationNumber ||
      !registeredOwnerName ||
      !rtoDetails ||
      !registrationDate ||
      !ownership
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Check for duplicate registrationNumber
    const existingVehicle = await Vehicle.findOne({ registrationNumber });
    if (existingVehicle) {
      return res.status(400).json({ message: "Duplicate registration number" });
    }
    const vehicleid = await generateVehicleId(businessId);
    console.log(vehicleid);

    // ✅ Create and save vehicle
    const vehicle = new Vehicle({
      businessId,
      image: {
        imageUrl: image.imageUrl || "",
        publicId: image.publicId || "",
      },
      name,
      vehicleId: vehicleid,
      model,
      brand,
      registrationNumber,
      registeredOwnerName,
      rtoDetails,
      registrationDate,
      ownership,
      insuranceValidTill,
      fcValidTill,
    });

    await vehicle.save();

    return res.status(201).json({
      message: "Vehicle registered successfully",
      vehicle,
    });
  } catch (error) {
    console.error("Vehicle Registration Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

exports.GetbussinessVechile = async (req, res) => {
  try {
    
    const { businessId } = req.params;
    const vechiles=await Vehicle.find({businessId:businessId})
    if(!vechiles || vechiles.length===0){
        return res.json({message:"No vehicles found"})
    }    
    const businessvehiclecount=vechiles.length
    const totvehicles=await Vehicle.find()
    const allvechilecount=totvehicles.length
    res.json({vechiles,businessvehiclecount,allvechilecount})
  } catch (error) {}
};
