// import { useState } from "react";
import { toast } from "react-toastify";

export const BusinessImageEditor = ({
  userId,
  token,
  publicId,
  baseUrl,
  businessId,
}) => {
  // const [NewImageUrl, setNewImageUrl] = useState(null);
  // const [ NewpublicId,setpublicId] = useState(null);

  const handleImageUpload = async (file) => {
    if (!file || !userId || !token || !baseUrl) return;

    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {

      const res = await fetch(`${baseUrl}/v3/bussinessimage/upload/${userId}`, {
        method: "POST",
        body: imageFormData,
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();

      if (res.ok && result.imageUrl) {
        const uploadedImageUrl = result.imageUrl;
        const uploadedPublicId = result.public_id;

        // setNewImageUrl(uploadedImageUrl);
        // setpublicId(uploadedPublicId);
        const response = await fetch(
          `${baseUrl}/v3/bussinessimage/${userId}/deleteimage/${businessId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              public_id: publicId,
              newpublicId: uploadedPublicId,
              newImageUrl: uploadedImageUrl,
            }),
          }
        );
        if (response.ok) {
          toast.success("Logo uploaded!");
        }
      } else {
        toast.error(result?.error || "Image upload failed.");
      }
    } catch (err) {
      toast.error("Server error during image upload.");
      console.error("Image upload failed:", err);
    }
  };

  return {
    handleImageUpload,
  };
};

export const ProductImageEditor = ({
  userId,
  token,
  publicId,
  baseUrl,
  businessId,
}) => {
  // const [NewImageUrl, setNewImageUrl] = useState(null);
  // const [ NewpublicId,setpublicId] = useState(null);

  const handleImageUpload = async (file) => {
    if (!file || !userId || !token || !baseUrl) return;

    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {

      const res = await fetch(
        `${baseUrl}/v3/bussinessimage/product/upload/${userId}`,
        {
          method: "POST",
          body: imageFormData,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const result = await res.json();

      if (res.ok && result.imageUrl) {
        const uploadedImageUrl = result.imageUrl;
        const uploadedPublicId = result.public_id;

        // setNewImageUrl(uploadedImageUrl);
        // setpublicId(uploadedPublicId);
        
        const response = await fetch(
          `${baseUrl}/v3/bussinessimage/product/deleteproductimage/${userId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              public_id: publicId,
              newpublicId: uploadedPublicId,
              newImageUrl: uploadedImageUrl,
            }),
          }
        );
        if (response.ok) {
          toast.success("Logo uploaded!");
        }
      } else {
        toast.error(result?.error || "Image upload failed.");
      }
    } catch (err) {
      toast.error("Server error during image upload.");
      console.error("Image upload failed:", err);
    }
  };

  return {
    handleImageUpload,
  };
};

export const EmployeeImageEditor = ({
  userId,
  token,
  publicId,
  baseUrl,
  businessId,
}) => {
  const handleImageUpload = async (file) => {
    if (!file || !userId || !token || !baseUrl) return;

    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {

      const res = await fetch(`${baseUrl}/v3/userimage/upload/${userId}`, {
        method: "POST",
        body: imageFormData,
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();

      if (res.ok && result.image_url) {
        const uploadedImageUrl = result.image_url;
        const uploadedPublicId = result.public_id;

        const response = await fetch(
          `${baseUrl}/v3/userimage/deleteEmployeeimage/${userId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              public_id: publicId,
              newpublicId: uploadedPublicId,
              newImageUrl: uploadedImageUrl,
            }),
          }
        );
        if (response.ok) {
          toast.success("Employee profile pic uploaded!");
        }
      } else {
        toast.error(result?.error || "Image upload failed.");
      }
    } catch (err) {
      toast.error("Server error during image upload.");
      console.error("Image upload failed:", err);
    }
  };

  return {
    handleImageUpload,
  };
};


export const VechileImageEditor = ({
  userId,
  token,
  publicId,
  baseUrl,
  businessId,
}) => { 

  const handleImageUpload = async (file) => {
    if (!file || !userId || !token || !baseUrl) return;

    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {

      const res = await fetch(
        `${baseUrl}/v3/bussinessimage/vechile/upload/${userId}`,
        {
          method: "POST",
          body: imageFormData,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const result = await res.json();

      if (res.ok && result.imageUrl) {
        const uploadedImageUrl = result.imageUrl;
        const uploadedPublicId = result.public_id;

        // setNewImageUrl(uploadedImageUrl);
        // setpublicId(uploadedPublicId);
        const response = await fetch(
          `${baseUrl}/v3/bussinessimage/vechile/deleteVechileimage/${userId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              public_id: publicId,
              newpublicId: uploadedPublicId,
              newImageUrl: uploadedImageUrl,
            }),
          }
        );
        if (response.ok) {
          toast.success("Logo uploaded!");
        }
      } else {
        toast.error(result?.error || "Image upload failed.");
      }
    } catch (err) {
      toast.error("Server error during image upload.");
      console.error("Image upload failed:", err);
    }
  };

  return {
    handleImageUpload,
  };
};
