import React, { useState } from "react";
import { Box, Button } from "@mui/material";

const PincodeChecker = ({ onClose }) => {
  const [pincode, setPincode] = useState("");
  const [pincodeType, setPincodeType] = useState("");
  const [isPincodeValid, setIsPincodeValid] = useState(false);

  const handlePincodeChange = (event) => {
    const value = event.target.value;
    setPincode(value);
    setIsPincodeValid(/^\d{6}$/.test(value)); // Check if pincode is exactly 6 digits
  };

  const handlePincodeTypeChange = (type) => {
    setPincodeType(type);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isPincodeValid && pincodeType) {
      console.log("Pincode:", pincode);
      console.log("Pincode Type:", pincodeType);
      // Handle the submit logic here, such as passing the data to the parent component
      onClose();
    }
  };

  return (
    <Box
      className="oc-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="oc-overlay-title-0"
      style={{ transform: "translateX(0%)", position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box className="oc-overlay-container" style={{ background: "#fff", padding: "20px", borderRadius: "8px", maxWidth: "500px", width: "100%" }}>
        <Box className="oc-overlay-header flex" id="oc-overlay-title-0" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <Box className="flex-1">
            <h4 className="text-base font-semibold mb-1">Enter Pincode</h4>
            <p className="text-xs">This is to check our serviceability in your area</p>
          </Box>
          <Button
            type="button"
            onClick={onClose}
            style={{ background: "transparent", border: "none", cursor: "pointer" }}
          >
            <svg
              className="mat-icon notranslate"
              aria-hidden="true"
              viewBox="0 0 24 24"
              style={{ width: "24px", height: "24px" }}
            >
              <path d="M18.909,18.7a.854.854,0,0,0-.022-.992l-5.7-5.7,5.726-5.73a.845.845,0,0,0-.1-1.082.982.982,0,0,0-.115-.1.854.854,0,0,0-.993.022l-5.7,5.7L6.27,5.091a.847.847,0,0,0-1.082.1.923.923,0,0,0-.1.116.857.857,0,0,0,.022.993L10.817,12,5.091,17.73a.845.845,0,0,0,.1,1.082.99.99,0,0,0,.115.1.856.856,0,0,0,.993-.023l5.7-5.7,5.729,5.726a.849.849,0,0,0,1.083-.1.917.917,0,0,0,.1-.116"></path>
            </svg>
          </Button>
        </Box>
        <Box className="oc-overlay-content" id="oc-overlay-content-1" style={{ maxHeight: "none", height: "auto" }}>
          <form onSubmit={handleSubmit} noValidate>
            <Box>
              <Box className="mat-form-field mb-6" style={{ marginBottom: "20px" }}>
                <label htmlFor="pincode">Enter Pincode *</label>
                <input
                  type="tel"
                  id="pincode"
                  maxLength="6"
                  value={pincode}
                  onChange={handlePincodeChange}
                  required
                  aria-required="true"
                  className={`mat-input-element ${!isPincodeValid ? "ng-invalid" : ""}`}
                  style={{ width: "100%", padding: "8px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
              </Box>
            </Box>
            <Box className={`transition-opacity duration-200 ease-smooth ${!isPincodeValid ? "opacity-50 cursor-not-allowed" : ""}`} style={{ transition: "opacity 0.2s ease-in-out" }}>
              <h4 className="text-base font-semibold mb-1">Select Pincode Type</h4>
              <p className="text-xs mb-4">Select your address as per the pin code entered</p>
              <Box className="pointer-events-none">
                <Box className="ng-star-inserted" style={{ display: "flex", flexWrap: "wrap" }}>
                  {[
                    "Aadhaar Address",
                    "Registered Business address",
                    "Current residential address",
                  ].map((type) => (
                    <Box
                      key={type}
                      className={`border border-default-300 cursor-pointer font-semibold inline-block m-2 min-h-10 min-w-24 p-3 rounded-lg shadow text-center ${pincodeType === type ? "selected" : ""}`}
                      onClick={() => handlePincodeTypeChange(type)}
                      style={{ padding: "8px 16px", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", margin: "4px", backgroundColor: pincodeType === type ? "#007bff" : "#fff", color: pincodeType === type ? "#fff" : "#000" }}
                    >
                      {type}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
            <Box className="oc-overlay-footer" id="oc-overlay-footer-2" style={{ marginTop: "20px" }}>
              <Button
                type="submit"
                className="w-full oc-btn oc-flat-Button btn-c-primary btn-s-sm transition"
                disabled={!isPincodeValid || !pincodeType}
                style={{ width: "100%", padding: "10px 0", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: !isPincodeValid || !pincodeType ? "not-allowed" : "pointer" }}
              >
                <span className="Button-wrapper inline-flex items-center justify-center">
                  Apply
                </span>
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default PincodeChecker;
