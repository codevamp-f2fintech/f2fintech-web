import React, { useState } from "react";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  FormGroup,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import applicationValidation from "./applicationValidation";
import Otp from "./Otp";
import PincodeChecker from "./PinCode";
import "./Button.css";

const initialValues = {
  name: "",
  number: "",
  email: "",
  pincode1: "", // Changed from 'pincode' to 'pincode1' to avoid naming conflicts
  pan: "",
  gst: "",
  company_name: "",
  entity_type: "",
  bank_account_type: "",
  industry_type: "",
  sub_industry_type: "",
  refrrel_id: "",
};

const Step1Form = ({ handleNext }) => {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [doYouHaveGSTRegistration, setDoYouHaveGSTRegistration] =
    useState(false);
  const [hasCompanyName, setHasCompanyName] = useState(false);
  const [showPincodeChecker, setShowPincodeChecker] = useState(false); // State to manage when to show PincodeChecker
  const [pincode, setPincode] = useState("");
  const [pincodeType, setPincodeType] = useState("");
  const [isPincodeValid, setIsPincodeValid] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOtpChange = (index, event) => {
    const value = event.target.value;
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleOtpSubmit = () => {
    // Add any OTP validation logic here if needed
    handleNext();
    handleClose();
  };

  const handleGSTCheckboxChange = (event) => {
    setDoYouHaveGSTRegistration(event.target.checked);
  };

  const handleCompanyNameCheckboxChange = (event) => {
    setHasCompanyName(event.target.checked);
  };

  const handlePincodeSubmit = () => {
    // Handle pincode submission here if needed
    setShowPincodeChecker(true); // Hide PincodeChecker after submission if necessary
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={applicationValidation}
        onSubmit={(values, actions) => {
          setShowPincodeChecker(true); // Show PincodeChecker when form is submitted
          handleClickOpen();
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          errors,
          touched,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                marginBottom: "15px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "bold 10px",
                    fontSize: "4vh",
                    fontWeight: "300vh",
                  }}
                >
                  Basic Details
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "-moz-initial",
                    fontSize: "2.5vh",
                    color: "gray",
                  }}
                >
                  Step 1/6
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "15px 15px",
                  gap: 2,
                }}
              >
                <TextField
                  variant="filled"
                  name="name"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                  fullWidth
                />

                <TextField
                  variant="filled"
                  name="number"
                  label="Number"
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.number && Boolean(errors.number)}
                  helperText={touched.number && errors.number}
                  sx={{
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                  fullWidth
                />

                <TextField
                  variant="filled"
                  name="email"
                  label="E-mail"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                  fullWidth
                />
                 <TextField
                  variant="filled"
                  name="pincode"
                  label="Pincode"
                  value={values.pincode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.pincode && Boolean(errors.pincode)}
                  helperText={touched.pincode && errors.pincode}
                  sx={{
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                  fullWidth
                />


                {/* Conditionally render PincodeChecker */}
                {/* {showPincodeChecker && (
                  <PincodeChecker
                    pincode={pincode}
                    setPincode={setPincode}
                    pincodeType={pincodeType}
                    setPincodeType={setPincodeType}
                    isPincodeValid={isPincodeValid}
                    setIsPincodeValid={setIsPincodeValid}
                    onSubmit={handlePincodeSubmit}
                  />
                )}x */}

                <TextField
                  variant="filled"
                  name="pan"
                  label="PAN*"
                  value={values.pan}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.pan && Boolean(errors.pan)}
                  helperText={touched.pan && errors.pan}
                  sx={{
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                  fullWidth
                />

                <FormControlLabel
                  sx={{ marginRight: "110px" }}
                  label="Do you have GST Registration?"
                  control={
                    <Checkbox
                      color="default"
                      name="do_you_have_gst_registration"
                      checked={doYouHaveGSTRegistration}
                      onChange={handleGSTCheckboxChange}
                    />
                  }
                />

                {doYouHaveGSTRegistration && (
                  <TextField
                    variant="filled"
                    name="gst"
                    label="GST"
                    value={values.gst}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.gst && Boolean(errors.gst)}
                    helperText={touched.gst && errors.gst}
                    sx={{
                      width: "75%",
                      height: "50px",
                      fontSize: "16px",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                    fullWidth
                  />
                )}

                <FormControlLabel
                  sx={{ marginRight: "211px" }}
                  label="Company Name?"
                  control={
                    <Checkbox
                      color="default"
                      name="company_name"
                      checked={hasCompanyName}
                      onChange={handleCompanyNameCheckboxChange}
                    />
                  }
                />

                {hasCompanyName && (
                  <TextField
                    variant="filled"
                    name="company_name"
                    label="Company Name"
                    value={values.company_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.company_name && Boolean(errors.company_name)}
                    helperText={touched.company_name && errors.company_name}
                    sx={{
                      width: "75%",
                      height: "50px",
                      fontSize: "16px",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                    fullWidth
                  />
                )}

                <TextField
                  variant="filled"
                  name="entity_type"
                  label="Entity Type"
                  value={values.entity_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.entity_type && Boolean(errors.entity_type)}
                  helperText={touched.entity_type && errors.entity_type}
                  sx={{
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                  fullWidth
                />

                <TextField
                  variant="filled"
                  name="bank_account_type"
                  label="Bank Account Type"
                  value={values.bank_account_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.bank_account_type &&
                    Boolean(errors.bank_account_type)
                  }
                  helperText={
                    touched.bank_account_type && errors.bank_account_type
                  }
                  sx={{
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                  fullWidth
                />

                <TextField
                  variant="filled"
                  name="industry_type"
                  label="Industry Type"
                  value={values.industry_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.industry_type && Boolean(errors.industry_type)}
                  helperText={touched.industry_type && errors.industry_type}
                  sx={{
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                  fullWidth
                />

                <TextField
                  variant="filled"
                  name="sub_industry_type"
                  label="Sub Industry Type"
                  value={values.sub_industry_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.sub_industry_type &&
                    Boolean(errors.sub_industry_type)
                  }
                  helperText={
                    touched.sub_industry_type && errors.sub_industry_type
                  }
                  sx={{
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                  fullWidth
                />

                <TextField
                  variant="filled"
                  name="refrrel_id"
                  label="Refrrel id (Optional)"
                  value={values.refrrel_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.refrrel_id && Boolean(errors.refrrel_id)}
                  helperText={touched.refrrel_id && errors.refrrel_id}
                  sx={{
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                  fullWidth
                />

                <FormGroup sx={{ display: "flex", ml: 5, mr: 8 }}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label={
                      <Typography sx={{ fontSize: "0.875rem", color: "gray" }}>
                        I agree to opt for the product and service of F2fintech.
                        By opting for F2fintech, I agree to have read,
                        understood and explicitly consent to the T&C, Privacy
                        Policy and F2fintech Credit Terms.
                      </Typography>
                    }
                  />
                </FormGroup>
                <FormGroup sx={{ display: "flex", ml: 5, mr: 8 }}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label={
                      <Typography sx={{ fontSize: "0.800rem", color: "gray" }}>
                        I further consent to receive the loan and product
                        updates of F2fintech on WhatsApp and allow F2fintech
                        and/or their authorized third party service providers to
                        contact me for marketing purposes via SMS, Telephone,
                        Email, or any other means.
                      </Typography>
                    }
                  />
                </FormGroup>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    color: "white",
                    fontWeight: "500",
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                    mt: 2,
                  }}
                >
                  Apply Now
                </Button>
              </Box>
            </Container>
          </Form>
        )}
      </Formik>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter OTP</DialogTitle>
        <DialogContent>
          <Otp length={4} onChange={(otp) => setOtp(otp)} value={otp} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOtpSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Step1Form;
