import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Image_default from "../../Assets/Images/Default.png";
import { useUser } from "../../context/userContext";
import { toast } from "react-toastify";
import {
  getVerificationStatus,
  VerificationModal,
} from "../../Utils/VerifyStatus";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const { user, token } = useUser();
  const baseUrl = process.env.REACT_APP_BACKEND_URI;
  const userId = user?.id;
  const [isVerified, setIsVerified] = useState(false);
  const [rules, setRules] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    age: "",
    gender: "",
    profilepic: {
      imageUrl: null,
      publicId: null,
    },
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmNew: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalValue, setModalValue] = useState(null);

  // ✅ Fetch user data test ok
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
        toast.error("Error fetching user data");
      }
    };

    fetchUserData();
  }, [user, token, userId, baseUrl]);

  //test ok
  useEffect(() => {
    const newPass = passwords.newPass;
    const confirmPass = passwords.confirmNew;

    setPasswordValidations({
      minLength: newPass.length >= 6,
      hasUppercase: /[A-Z]/.test(newPass),
      hasNumber: /\d/.test(newPass),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPass),
    });

    setRules(newPass.length > 0);

    // ✅ Check match
    setPasswordsMatch(confirmPass === "" || newPass === confirmPass);
  }, [passwords.newPass, passwords.confirmNew]);


  //test ok 

  const handleProfileUpdate = async () => {
    try {
      const res = await fetch(`${baseUrl}/v1/users/updateuser/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated successfully");
        setEditMode(false);

        const newProfilePicUrl = data.profilepic.imageUrl;
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser) {
          storedUser.profilepic = newProfilePicUrl;

          localStorage.setItem("user", JSON.stringify(storedUser));
        }
        window.location.reload();
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Error updating profile");
    }
  };

  //test ok
  const verifyCurrentPassword = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/v1/users/verify-password/${user?.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: passwords.current }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setIsVerified(true);
        toast.success("Password verified");
      } else {
        toast.error(data.message || "Incorrect password");
      }
    } catch (err) {
      console.error("Verify password error:", err);
      toast.error("Error verifying password");
    }
  };
//test ok 
  const handlePasswordUpdate = async () => {
    if (passwords.newPass !== passwords.confirmNew) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        `${baseUrl}/v1/users/change-password/${user?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newPassword: passwords.newPass }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("Password updated successfully");
        setPasswords({ current: "", newPass: "", confirmNew: "" });
        setShowPasswordFields(false);
        setIsVerified(false);
      } else {
        toast.error(data.message || "Password update failed");
      }
    } catch (err) {
      console.error("Password update error:", err);
      toast.error("Server error");
    }
  };
//test ok 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
//test ok 

  const resetPasswordFields = () => {
    setShowPasswordFields(false);
    setPasswords({ current: "", newPass: "", confirmNew: "" });
    setIsVerified(false);
    setRules(false);
  };
//test ok 

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

  //test ok
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };
  //test ok
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const currentImageId = userData.profilepic?.publicId;
    const originalImage = user?.profilepic?.imageUrl;
    const isNewImage = originalImage !== userData.profilepic?.imageUrl;

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
                <label>
                  {label}
                  {field === "email" &&
                    getVerificationStatus(user?.emailVerified, "email", () =>
                      handleVerifyClick("email", userData.email)
                    )}
                </label>
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
              <Col
                md={field === "line1" || field === "line2" ? 12 : 4}
                key={field}
              >
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
          <Button variant="primary" onClick={handleProfileUpdate}>
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
            {!isVerified && (
              <>
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
                <Col md={2} className="d-flex align-items-end">
                  <Button
                    variant="outline-success"
                    className="w-100"
                    onClick={verifyCurrentPassword}
                    disabled={!passwords.current}
                  >
                    Verify
                  </Button>
                </Col>
              </>
            )}

            {isVerified && (
              <>
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
                  {rules && (
                    <ul className="list-unstyled mt-2">
                      <li
                        style={{
                          color: passwordValidations.minLength
                            ? "green"
                            : "red",
                        }}
                      >
                        {passwordValidations.minLength ? "✔" : "✖"} Minimum 6
                        characters
                      </li>
                      <li
                        style={{
                          color: passwordValidations.hasUppercase
                            ? "green"
                            : "red",
                        }}
                      >
                        {passwordValidations.hasUppercase ? "✔" : "✖"} At least
                        1 uppercase letter
                      </li>
                      <li
                        style={{
                          color: passwordValidations.hasNumber
                            ? "green"
                            : "red",
                        }}
                      >
                        {passwordValidations.hasNumber ? "✔" : "✖"} At least 1
                        number
                      </li>
                      <li
                        style={{
                          color: passwordValidations.hasSpecialChar
                            ? "green"
                            : "red",
                        }}
                      >
                        {passwordValidations.hasSpecialChar ? "✔" : "✖"} At
                        least 1 special character
                      </li>
                    </ul>
                  )}
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
                  {passwords.confirmNew && (
                    <div
                      className="mt-1"
                      style={{ color: passwordsMatch ? "green" : "red" }}
                    >
                      {passwordsMatch
                        ? "✔ Passwords match"
                        : "✖ Passwords do not match"}
                    </div>
                  )}
                </Col>

                <Col xs={12} className="text-end">
                  <Button
                    variant="success"
                    className="me-2"
                    onClick={handlePasswordUpdate}
                  >
                    Update Password
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={resetPasswordFields}
                  >
                    Cancel
                  </Button>
                </Col>
              </>
            )}
          </Row>
        )}
      </div>

      {/* //Optional: Verification Modal */}
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
