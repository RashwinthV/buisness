// Helpers/cloudinaryService.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadToCloudinary = async (filePath,) => {
  const result = await cloudinary.uploader.upload(filePath, {
     folder: 'profile-pics',
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  });
  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};


exports.uploadProductToCloudinary = async (filePath,) => {
  const result = await cloudinary.uploader.upload(filePath, {
     folder: 'product_Images',
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  });
  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

exports.uploadVechileToCloudinary = async (filePath,) => {
  const result = await cloudinary.uploader.upload(filePath, {
     folder: 'Vechile_Images',
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  });
  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};




exports.deleteFromCloudinary = async (publicId) => {
  const result = await cloudinary.uploader.destroy(publicId);
  return result;
};