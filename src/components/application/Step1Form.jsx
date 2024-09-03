import { useCallback, useState } from "react";
import { Formik, Form } from "formik";
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
import API from "../../apis";

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
  email: "",
  contact: "",
  status: "active",
  pan: "",
  gst_number: "",
  bank_ac_type: "",
  zipcode: "",

  company_name: "",
  entity_type: "",
  industry_type: "",
  sub_industry_type: "",
  refrrel_id: "",
};

const Step1Form = ({ handleNext, loanType, setLoanType }) => {
  const [doYouHaveGSTRegistration, setDoYouHaveGSTRegistration] =
    useState(false);
  const [companyNameOption, setCompanyNameOption] = useState(""); // Add state for radio button selection

  const [getStarted, setGetStarted] = useState(false);

  const handleGSTCheckboxChange = (event) => {
    setLoanType(event.target.checked ? "business" : "personal");
    setDoYouHaveGSTRegistration(event.target.checked);
  };

  const handleCompanyNameOptionChange = (event) => {
    setCompanyNameOption(event.target.value);
  };

  const create = useCallback((values) => {
    //object and array destructing , spread and rest operator , object assignment
    const { contact, email, name, status, ...restValues } = values;
    const customer = {
      contact,
      email,
      name,
      status,
    };
    console.log("these are form values=>", customer, restValues);
    API.CustomerAPI.register(customer)
      .then(({ data: res }) => {
        if (res.status === "Success") {
          const customerInfo = {
            customer_id: res.data.id,
            ...restValues,
          };
          // console.log("here it is", customerInfo);
          API.CustomerInfoAPI.create(customerInfo)
            .then((res) => {
              // console.log("final boss", res);
            })
            .catch((err) => {
              console.log("Error in Customer Info API", err);
            });
        } else {
          console.error("Registration failed");
        }
      })
      .catch((err) => {
        console.error("Error during registration:", err);
      });
  }, []);

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
  


  if (!getStarted) {
    return (
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
   name="contact"
   label="contact"
   value={values.contact}
   onChange={handleChange}
   onBlur={handleBlur}
   error={touched.contact && Boolean(errors.contact)}
   helperText={touched.contact && errors.contact}
   sx={{
     width: "75%",
     height: "50px",
     fontSize: "16px",
     borderRadius: "10px",
     overflow: "hidden",
   }}
   fullWidth
 />
    )
}

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => create(values)}
      >
        {({
          dirty,
          errors,
          touched,
          values,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
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
                  name="contact"
                  label="contact"
                  value={values.contact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.contact && Boolean(errors.contact)}
                  helperText={touched.contact && errors.contact}
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
                  name="zipcode"
                  label="zipcode"
                  value={values.zipcode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.zipcode && Boolean(errors.zipcode)}
                  helperText={touched.zipcode && errors.zipcode}
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

                <Typography sx={{ marginRight: "20px", font: "18px bold" }}>
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
                      marginLeft: "8vw",
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
                    name="bank_ac_type"
                    value={values.bank_ac_type}
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
                  sx={{ marginRight: "20px" }}
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
                    name="gst_number"
                    label="GST Number"
                    value={values.gst_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.gst_number && Boolean(errors.gst_number)}
                    helperText={touched.gst_number && errors.gst_number}
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
                  color="primary"
                  disabled={!dirty}
                  type="submit"
                  variant="contained"
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
