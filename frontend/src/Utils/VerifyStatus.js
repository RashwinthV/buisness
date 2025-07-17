// Utils/VerifyStatus.js
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// ✅ Custom Hook to fetch verification status
export const useVerificationStatus = (userId) => {
  const [status, setStatus] = useState({ emailVerified: null, numberVerified: null });

  useEffect(() => {
    if (!userId) return;
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URI}/v1/users/verify-status/${userId}`);
        const data = await res.json();
        if (res.ok) setStatus({ emailVerified: data.emailVerified, numberVerified: data.numberVerified });
        else console.error("Verification fetch failed:", data.message);
      } catch (err) {
        console.error("Verification fetch error:", err);
      }
    };
    fetchStatus();
  }, [userId]);

  return status;
};

// ✅ Modal component to verify email or phone
export const VerificationModal = ({ show, onHide, type, value, onVerify }) => {
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [timer, setTimer] = useState(0);

  // ⏳ Countdown logic
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = async () => {
    try {
      // Simulate OTP API
      console.log("Sending OTP to:", value);
      // Start timer
      setTimer(60);
      setShowOtpInput(true);
    } catch (err) {
      console.error("Failed to send OTP:", err);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      // Simulate OTP verification API
      console.log("Verifying OTP:", otp);
      onVerify();
      onHide();
    } catch (err) {
      console.error("OTP verification failed:", err);
    }
  };

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
 <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Verify {type === "email" ? "Email" : "Phone"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>{type === "email" ? "Email ID" : "Phone Number"}</Form.Label>
          <Form.Control type="text" value={value} disabled />
        </Form.Group>

        {showOtpInput && (
          <Form.Group className="mb-3">
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP sent"
            />
          </Form.Group>
        )}

        <div className="d-flex justify-content-between align-items-center mb-2">
          <Button 
            onClick={handleSendOtp}
            variant="outline-primary"
            disabled={timer > 0} 
          >
            {timer > 0 ? "Resend OTP" : "Send OTP"}
          </Button>

          {showOtpInput && (
            <Button onClick={handleVerifyOtp} variant="success">
              Verify
            </Button>
          )}
        </div>

        {showOtpInput && (
          <span className="text-danger small ">
            {timer > 0
              ? `You can request OTP again in: ${formatTime(timer)}`
              : "You can now resend OTP."}
          </span>
        )}
      </Modal.Body>
    </Modal>
  );
};

// ✅ Main function you called
export const getVerificationStatus = (verified, type, onClickVerify) => {
  return verified ? (
    <span className="badge bg-success ms-2">Verified</span>
  ) : (
    <button type="button" className="btn btn-sm btn-danger ms-2 py-0 px-1" onClick={onClickVerify}>
      Verify
    </button>
  );
};
