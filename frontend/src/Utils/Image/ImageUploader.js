import { toast } from "react-toastify";

export const useBusinessImageUpload = ({
  userId,
  token,
  publicId,
  submittedRef,
  setImageData,
  baseUrl,
}) => {
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
        toast.success("Logo uploaded!");
        setImageData({
          imageUrl: result.imageUrl,
          publicId: result.public_id,
        });
      } else {
        toast.error(result?.error || "Image upload failed.");
      }
    } catch (err) {
      toast.error("Server error during image upload.");
      console.error("Image upload failed:", err);
    }
  };

  // // Cleanup image on page unload if not submitted
  // useEffect(() => {
  //   const handleUnload = async () => {
  //     if (publicId && !submittedRef?.current && userId) {
  //       try {
  //         await fetch(`${baseUrl}/v3/bussinessimage/deleteimage/${userId}`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //           body: JSON.stringify({ public_id: publicId }),
  //         });
  //         console.log("image deleted in image  unload");

  //       } catch (err) {
  //         console.warn("Image cleanup failed:", err.message);
  //       }
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleUnload);
  //     handleUnload();
  //   };
  // }, [publicId, submittedRef, token, baseUrl, userId]);

  return {
    handleImageUpload,
  };
};

export const useProductImageUpload = ({
  userId,
  token,
  publicId,
  bussinessId,
  setImageData,
  baseUrl,
}) => {
  const handleImageUpload = async (file) => {
    if (!file || !userId || !token || !baseUrl) return;

    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {
      const res = await fetch(
        `${baseUrl}/v3/bussinessimage/product/upload/${userId}/${bussinessId}`,
        {
          method: "POST",
          body: imageFormData,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const result = await res.json();

      if (result.success && result.imageUrl) {
        toast.success("Logo uploaded!");
        setImageData({
          imageUrl: result.imageUrl,
          publicId: result.public_id,
        });
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

export const userImageUpload = ({
  userId,
  token,
  publicId,
  setImageData, // ✅ You already pass this
  baseUrl,
}) => {
  const handleImageUpload = async (file) => {
    if (!file || !userId || !token || !baseUrl) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${baseUrl}/v3/userimage/upload/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const { image_url, public_id } = data;

        // ✅ Corrected from setUserData to setImageData
        setImageData({
          imageUrl: image_url,
          publicId: public_id,
        });

        toast.success("Image uploaded successfully!");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Image Upload Error:", err);
      toast.error("Error uploading image");
    }
  };

  return {
    handleImageUpload,
  };
};

export const VechileImageUpload = ({
  userId,
  token,
  publicId,
  setImageData, // ✅ You already pass this
  baseUrl,
}) => {
  const handleImageUpload = async (file) => {
    if (!file || !userId || !token || !baseUrl) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `${baseUrl}/v3/bussinessimage/vechile/upload/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok && data.success) {
        const { imageUrl, public_id } = data;

        // ✅ Corrected from setUserData to setImageData
        setImageData({
          imageUrl, // ✅ correct key
          publicId: public_id, // ✅ camelCase mapping
        });

        toast.success("Image uploaded successfully!");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Image Upload Error:", err);
      toast.error("Error uploading image");
    }
  };

  return {
    handleImageUpload,
  };
};
