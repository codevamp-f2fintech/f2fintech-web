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
  FormControl,
  FormGroup,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  styled,
  TextField,
  Typography,
  useRadioGroup,
} from "@mui/material";
import PropTypes from "prop-types";
import applicationValidation from "./applicationValidation";
import Otp from "./Otp";

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

MyFormControlLabel.propTypes = {
  value: PropTypes.any,
};

const initialValues = {
  name: "",
  number: "",
  email: "",
  pincode1: "",
  pan: "",
  gst: "",
  company_name: "",
  entity_type: "",
  bank_account_type: "",
  industry_type: "",
  sub_industry_type: "",
  refrrel_id: "",
};

const Step1Form = ({ handleNext, loanType, setLoanType }) => {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [doYouHaveGSTRegistration, setDoYouHaveGSTRegistration] =
    useState(false);
  const [companyNameOption, setCompanyNameOption] = useState(""); // Add state for radio button selection

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
    handleNext();
    handleClose();
  };

  const handleGSTCheckboxChange = (event) => {
    setLoanType(event.target.checked ? 'business' : 'personal')
    setDoYouHaveGSTRegistration(event.target.checked);
  };

  const handleCompanyNameOptionChange = (event) => {
    setCompanyNameOption(event.target.value);
  };

  const MyFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    margin: theme.spacing(1),
    "& .MuiTypography-root": {
      fontWeight: "bold",
    },
  }));

  // Custom styled Box
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
    backgroundColor: "white",
    boxShadow: theme.shadows[3],
    // borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(1),
  }));
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={applicationValidation}
        onSubmit={(values, actions) => {
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
                  Step 1/5
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
                  type="number"
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
                  type="email"
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

                <Typography sx={{ marginRight: "130px", font: "18px bold" }}>
                  Is your Company Registered?
                </Typography>
                <RadioGroup
                  name="company_name"
                  value={companyNameOption}
                  onChange={handleCompanyNameOptionChange}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginRight: "150px",
                  }}
                >
                  <FormControlLabel
                    value="yes"
                    control={
                      <Radio
                        sx={{
                          "& .MuiSvgIcon-root": {
                            visibility: "hidden",
                          },
                          position: "absolute", // Ensure the radio button does not take up space
                        }}
                      />
                    }
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        Yes
                      </Box>
                    }
                    sx={{
                      padding: "1px 30px",
                      height: "40px",
                      borderRadius: "15px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      border:
                        companyNameOption === "yes"
                          ? "1px solid skyblue"
                          : "2px solid transparent",
                      "&:hover": {
                        borderColor: "lightblue",
                      },
                    }}
                  />
                  <FormControlLabel
                    value="no"
                    control={
                      <Radio
                        sx={{
                          "& .MuiSvgIcon-root": {
                            visibility: "hidden",
                          },
                          position: "absolute", // Ensure the radio button does not take up space
                        }}
                      />
                    }
                    label={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        No
                      </Box>
                    }
                    sx={{
                      padding: "1px 30px",
                      height: "40px",
                      borderRadius: "15px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      border:
                        companyNameOption === "no"
                          ? "1px solid skyblue"
                          : "2px solid transparent",
                      "&:hover": {
                        borderColor: "lightblue",
                      },
                    }}
                  />
                </RadioGroup>

                {companyNameOption === "yes" && (
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
                {/* <FormControlLabel
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
                )} */}
                <FormControl
                  variant="filled"
                  sx={{
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <InputLabel>Entity Type</InputLabel>
                  <Select variant="filled" name="entity_type">
                    <MenuItem value="A+">Sole Proprietorship</MenuItem>
                    <MenuItem value="A-">Partnership</MenuItem>
                    <MenuItem value="B+"> LLC</MenuItem>
                    <MenuItem value="B-">Corporation</MenuItem>
                  </Select>
                </FormControl>

                {/* <TextField
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
                /> */}
                <FormControl
                  variant="filled"
                  sx={{
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <InputLabel>Bank Account Type</InputLabel>
                  <Select variant="filled" name="bank-account_type">
                    <MenuItem value="A+">Savings Account</MenuItem>
                    <MenuItem value="A-">Current Account</MenuItem>
                    <MenuItem value="B+">Fixed Deposit Account</MenuItem>
                    <MenuItem value="B-">Recurring Deposit Account</MenuItem>
                  </Select>
                </FormControl>
                {/* 
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
                /> */}
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
                  variant="contained"
                  color="primary"
                  onClick={handleClickOpen}
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
