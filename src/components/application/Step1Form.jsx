import React, { useState } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  Container,
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
  pincode: "",
  pan: "",
  gst: "",
  company_name: "",
  entity_type: "",
  bank_account_type: "",
  industry_type: "",
  sub_industry_type: "",
  refrrel_id: "",
};

const sendFormDataToAPI = async (formData) => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/v1/create-customer-info",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Data stored in the database:", data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

const Step1Form = ({ handleNext, loanType, setLoanType }) => {
  const [doYouHaveGSTRegistration, setDoYouHaveGSTRegistration] =
    useState(false);
  const [companyNameOption, setCompanyNameOption] = useState(""); // Add state for radio button selection

  const handleGSTCheckboxChange = (event) => {
    setLoanType(event.target.checked ? "business" : "personal");
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
                    control={<Radio />}
                    label="Yes"
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
                    control={<Radio />}
                    label="No"
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
                  <Select
                    variant="filled"
                    name="entity_type"
                    value={values.entity_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="Sole Proprietorship">
                      Sole Proprietorship
                    </MenuItem>
                    <MenuItem value="Partnership">Partnership</MenuItem>
                    <MenuItem value="LLC">LLC</MenuItem>
                    <MenuItem value="Corporation">Corporation</MenuItem>
                  </Select>
                </FormControl>

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
                  <Select
                    variant="filled"
                    name="bank_account_type"
                    value={values.bank_account_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="Savings Account">Savings Account</MenuItem>
                    <MenuItem value="Current Account">Current Account</MenuItem>
                    <MenuItem value="Fixed Deposit Account">
                      Fixed Deposit Account
                    </MenuItem>
                    <MenuItem value="Recurring Deposit Account">
                      Recurring Deposit Account
                    </MenuItem>
                  </Select>
                </FormControl>

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
                  type="button"
                  onClick={() => sendFormDataToAPI(values)}
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
    </>
  );
};

export default Step1Form;
