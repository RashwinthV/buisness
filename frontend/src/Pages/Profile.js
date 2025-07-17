import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image_default from "../Assets/Images/Default.png";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const [user, setUser] = useState({
    image: "",
    name: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    city: "",
    district: "",
    pincode: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) return;

        const res = await fetch(`${baseUrl}/v1/users/getuserdata/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUserData(data);
        } else {
          toast.error(data.message || "Failed to fetch user data");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Error Fetching user Data");
      }
    };

    fetchUserData();
  }, [user, token, userId, baseUrl]);

useEffect(() => {
  const handleUnload = async () => {
    const imageUploaded = userData.profilepic?.publicId;
    const imageIsNew =
      !user?.profilepic?.imageUrl ||
      user?.profilepic?.imageUrl !== userData.profilepic?.imageUrl;

    if (imageUploaded && imageIsNew) {
      try {
        await fetch(`${baseUrl}/v3/userimage/deleteimage/${user?.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ public_id: userData.profilepic.publicId }),
        });
        console.log("🧹 Auto-deleted profile image on unload.");
      } catch (err) {
        console.error("⚠️ Auto-delete failed:", err);
      }
    }
  };

  // Handle tab close, refresh, or manual unload
  window.addEventListener("beforeunload", handleUnload);

  // Handle route change/component unmount
  return () => {
    window.removeEventListener("beforeunload", handleUnload);
    handleUnload();
  };
}, [
  userData.profilepic?.publicId,
  userData.profilepic?.imageUrl,
  user?.profilepic?.imageUrl,
  user?.id,
  token,
  baseUrl,
]);




  
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmNew: "",
  });

  const status = useVerificationStatus(userId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image upload with deletion of previous one
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const currentImageId = userData.profilepic?.publicId;
    const originalImage = user?.profilepic?.imageUrl;
    const isNewImage = originalImage !== userData.profilepic?.imageUrl;

    // 🧹 Delete previous image before uploading new one
    if (currentImageId && isNewImage) {
      try {
        await fetch(`${baseUrl}/v3/userimage/deleteimage/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ public_id: currentImageId }),
        });
        console.log("Deleted previous image before new upload.");
      } catch (err) {
        console.error("Failed to delete previous image:", err);
      }
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

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

        setUserData((prev) => ({
          ...prev,
          profilepic: {
            imageUrl: image_url,
            publicId: public_id,
          },
        }));

        toast.success("Image uploaded successfully!");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch (err) {
      console.error("Image Upload Error:", err);
      toast.error("Error uploading image");
    }
  };

  const handleVerifyClick = (type, value) => {
    setModalType(type);
    setModalValue(value);
    setShowModal(true);
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Profile</h4>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "Cancel" : <i className="bi bi-pencil-square"></i>}
        </Button>
      </div>

      <Row className="mb-4">
        <Col xs={12} md={4} className="text-center mb-3">
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto",
              border: "2px solid #ddd",
            }}
          >
            <img
              src={userData?.profilepic?.imageUrl || Image_default}
              alt="User"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => (e.target.src = Image_default)}
            />
          </div>

          {editMode && (
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                className="form-control form-control-sm"
                onChange={handleImageChange}
              />
            </div>
          )}
        </Col>

        <Col xs={12} md={8}>
          <Row className="gy-3">
            {[
              ["firstName", "First Name"],
              ["lastName", "Last Name"],
              ["email", "Email"],
              ["phoneNo", "Mobile Number"],
              ["age", "Age"],
              ["gender", "Gender"],
            ].map(([field, label]) => (
              <Col md={4} key={field}>
                <label>{label}</label>
                {editMode ? (
                  <input
                    className="form-control"
                    name={field}
                    value={userData?.[field] || ""}
                    onChange={handleInputChange}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                ) : (
                  <div>{userData?.[field] || "-"}</div>
                )}
              </Col>
            ))}

            {[
              ["line1", "Address Line 1"],
              ["line2", "Address Line 2"],
              ["city", "City"],
              ["state", "State"],
              ["country", "Country"],
              ["pincode", "Pincode"],
            ].map(([field, label]) => (
              <Col md={field === "address1" || field === "address2" ? 12 : 4} key={field}>
                <label>{label}</label>
                {editMode ? (
                  <input
                    className="form-control"
                    name={field}
                    value={userData?.address?.[field] || ""}
                    onChange={handleAddressChange}
                    placeholder={`Enter ${label.toLowerCase()}`}
                  />
                ) : (
                  <div>{userData?.address?.[field] || "-"}</div>
                )}
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {editMode && (
        <div className="text-end mb-4">
          <Button variant="primary" onClick={() => setEditMode(false)}>
            Update
          </Button>
        </div>
      )}

      <hr />
      <div className="mb-3">
        <h5>Change Password</h5>
        {!showPasswordFields ? (
          <Button
            variant="outline-primary"
            onClick={() => setShowPasswordFields(true)}
          >
            Change Password
          </Button>
        ) : (
          <Row className="gy-3">
            <Col md={4}>
              <label>Current Password</label>
              <input
                type="password"
                className="form-control"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
              />
            </Col>
            <Col md={4}>
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                name="newPass"
                value={passwords.newPass}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
              />
            </Col>
            <Col md={4}>
              <label>Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmNew"
                value={passwords.confirmNew}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
              />
            </Col>
            <Col xs={12} className="text-end">
              <Button variant="success" className="me-2">
                Update Password
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => {
                  setShowPasswordFields(false);
                  setPasswords({
                    current: "",
                    newPass: "",
                    confirmNew: "",
                  });
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        )}
      </div>

      {/* ✅ Verification Modal */}
      <VerificationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        type={modalType}
        value={modalValue}
        onVerify={() => window.location.reload()}
      />
    </Container>
  );
};

export default Profile;
