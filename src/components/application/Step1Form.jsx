/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormGroup,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
  useRadioGroup,
} from "@mui/material";
import { CurrencyRupee as CurrencyRupeeIcon } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import API from "../../apis";
import { Utility } from "../utility";

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));

// Custom component for handling radio button styles
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
  dob: null,
  city: "",
  pan: "",
  occupation_type: "",
};

const Step1Form = ({ applicationNumber, setApplicationNumber }) => {
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [loanStatus, setLoanStatus] = useState(null);
  const [getStarted, setGetStarted] = useState(false);    // To toggle form fields display

  const { getLocalStorage, setLocalStorage } = Utility();
  const storedCustomerId = getLocalStorage("customerInfo")?.id;

  // Generate random application number
  const randomNumberGenerator = () => Math.floor(10000000 + Math.random() * 90000000);

  // Fetch application number and loan status using stored customer ID
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (storedCustomerId) {
        try {
          const { data: response } = await API.CustomerApplicationAPI.getApplicationById(storedCustomerId);
          if (response.status === "Success") {
            setApplicationNumber(response.data.application_no);
            const { data: resp } = await API.LoanTrackingAPI.getLoanTrackingById(response.data.id);
            if (resp.status === "Success") {
              setLoanStatus(resp.data.status);
            }
          }
        } catch (err) {
          console.error("Error fetching customer data:", err);
        }
      }
    };
    fetchCustomerData();
  }, [storedCustomerId]);

  // Function to register the customer
  async function registerCustomer(customer) {
    const { data: res } = await API.CustomerAPI.register(customer);
    if (res.status !== "Success") {
      throw new Error(`Registration failed: ${res.message}`);
    }
    return res.data.id;
  }

  // Function to create customer info
  async function createCustomerInfo(customerId, restValues) {
    await API.CustomerInfoAPI.create({
      customer_id: customerId,
      ...restValues,
    });
  }

  // Function to create the customer application
  async function createCustomerApplication(customerId, applicationNumber, amount, tenure) {
    const { data: applicationResponse } = await API.CustomerApplicationAPI.createApplication({
      customer_id: customerId,
      application_no: applicationNumber,
      amount,
      tenure,
    });
    return applicationResponse.data.applicationId;
  }

  // Function to create loan tracking
  async function createLoanTracking(applicationId) {
    await API.LoanTrackingAPI.createLoanTracking({
      customer_application_id: applicationId,
      status: 'submitted',
    });
  }

  // Function to log in the customer
  async function loginCustomer(contact, name) {
    const response = await API.CustomerAPI.login({
      contact,
      password: `${name.toLowerCase().replace(/\s/g, '')}@9876`,
    });

    if (response.data.status === "Success") {
      const customerInfo = {
        id: response.data.data.id,
        name: response.data.data.name,
        token: response.data.data.token,
      };
      setLocalStorage("customerInfo", customerInfo);
      location.reload();
    }
  }

  // Create new customer with loan application
  const create = useCallback(
    async (values) => {
      const applicationNumber = randomNumberGenerator();
      const { contact, email, name, status, dob, ...restValues } = values;
      const customer = {
        contact,
        dob,
        email,
        name,
        password: `${name.toLowerCase().replace(/\s/g, '')}@9876`,
        status,
      };
      try {
        const customerId = storedCustomerId || await registerCustomer(customer);
        await createCustomerInfo(customerId, restValues);
        const applicationId = await createCustomerApplication(customerId, applicationNumber, amount, tenure);
        await createLoanTracking(applicationId);
        !storedCustomerId ? await loginCustomer(contact, name) : location.reload();

        console.log("Customer info, application, and loan tracking created successfully");
      } catch (err) {
        console.log("Error during customer creation:", err);
      }
    },
    [amount, tenure]
  );

  // If application number and loan status exists, display success message without making user to fill the form again
  if (applicationNumber && !(loanStatus === 'disbursed' || loanStatus === 'rejected')) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 2,
          padding: 3,
          border: "1px solid #b6b6b6",
          borderRadius: "20px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
          maxWidth: "500px",
          margin: "auto",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.4rem",
            lineHeight: "2rem",
            color: "#1976d2",
            fontWeight: "600",
            fontFamily: "Roboto, sans-serif",
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          Your application is submitted!
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#333",
            marginBottom: 2,
          }}
        >
          Your Application Number is <strong>{applicationNumber}</strong>.
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#333",
            marginBottom: 2,
          }}
        >
          <Link to='/loan-tracker'>
            Track Your Loan Status By Clicking Here
          </Link>
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#333",
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          We will contact you within the next half an hour. To speed up the
          process, please complete the next steps.
        </Typography>
      </Box>
    );
  }

  // Initial form view with amount and tenure selection
  if (!getStarted) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "1.1vw",
            lineHeight: "2rem",
            color: "black",
            fontWeight: "600",
            fontFamily: "cursive",
            marginBottom: 2,
          }}
        >
          Get the loan best suited for your wish
        </Typography>
        <Box sx={{ width: "45%", marginBottom: 3 }}>
          <TextField
            fullWidth
            variant="filled"
            name="amount"
            label="Enter Amount"
            placeholder="How Much Loan Do You Require?"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CurrencyRupeeIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              fontSize: "13px",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: 1,
              "& .MuiFilledInput-root": {
                borderRadius: "10px",
                border: "1px solid transparent",
                transition: "border-color 0.3s, border-width 0.3s",
                "&:hover": {
                  borderColor: "#0000ff",
                },
                "&.Mui-focused": {
                  borderColor: "#0000ff",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputAdornment-root": {
                color: "#000",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#0000ff",
              },
            }}
          />
        </Box>
        <FormControl
          variant="filled"
          sx={{
            width: "45%",
            fontSize: "13px",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: 3,
          }}
        >
          <InputLabel>Select A Comfortable Tenure</InputLabel>
          <Select
            variant="filled"
            name="tenure"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            sx={{
              "& .MuiFilledInput-root": {
                borderRadius: "10px",
                border: "1px solid transparent",
                transition: "border-color 0.3s, border-width 0.3s",
                "&:hover": {
                  borderColor: "#0000ff",
                },
                "&.Mui-focused": {
                  borderColor: "#0000ff",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputAdornment-root": {
                color: "#000",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#0000ff",
              },
            }}
          >
            {/* Creates an array with 40 elements, when (index < 4) it labels items as months, then it switches to years. */}
            {[...Array(40)].map((_, index) => {
              const value = (index + 1) * 12;
              const label = index < 4 ? `${value} Months` : `${index + 1} Years`;
              return (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <Button
          color="primary"
          disabled={!amount || !tenure}
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={() => setGetStarted(true)}
          sx={{
            fontWeight: "500",
            fontSize: "1rem",
            lineHeight: "1.5rem",
            mt: 2,
            width: "45%",
            alignSelf: "center",
            marginBottom: 3,
          }}
        >
          LET&apos;S GET STARTED
        </Button>
      </Box>
    );
  }

  // Main form view for getting customer details
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
          setFieldValue,
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
                    marginBottom: 3,
                  }}
                >
                  Basic Details
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "-moz-initial",
                    fontSize: "2.5vh",
                    color: "gray",
                    marginBottom: 3,
                  }}
                >
                  Step 1/3
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
                  label="Name*"
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
                    marginBottom: 3,
                  }}
                  fullWidth
                />
                <TextField
                  type="number"
                  variant="filled"
                  name="contact"
                  label="Contact*"
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
                    marginBottom: 3,
                  }}
                  fullWidth
                />
                <TextField
                  variant="filled"
                  type="email"
                  name="email"
                  label="E-mail*"
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
                    marginBottom: 3,
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
                    marginBottom: 3,
                  }}
                  fullWidth
                />
                <TextField
                  variant="filled"
                  name="city"
                  label="City*"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                  sx={{
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    marginBottom: 3,
                  }}
                  fullWidth
                />
                <FormControl
                  variant="filled"
                  sx={{
                    width: "75%",
                    height: "50px",
                    fontSize: "16px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    marginBottom: 3,
                  }}
                >
                  <InputLabel>Occupation Type*</InputLabel>
                  <Select
                    variant="filled"
                    name="occupation_type"
                    value={values.occupation_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="salaried">Salaried </MenuItem>
                    <MenuItem value="non-salaried">Non-Salaried</MenuItem>
                    <MenuItem value="professional">Professional</MenuItem>

                  </Select>
                </FormControl>
                <Box sx={{
                  width: '75%',
                  marginBottom: 3,
                }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Enter Date Of Birth*"
                      value={values.dob}
                      onChange={(newValue) => setFieldValue("dob", newValue)}
                    />
                  </LocalizationProvider>
                </Box>
                <FormGroup
                  sx={{ display: "flex", ml: 5, mr: 8, marginBottom: 3 }}
                >
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
                <FormGroup
                  sx={{ display: "flex", ml: 5, mr: 8, marginBottom: 3 }}
                >
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
                    marginBottom: 3,
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

Step1Form.propTypes = {
  applicationNumber: PropTypes.any,
  setApplicationNumber: PropTypes.func.isRequired
};

export default Step1Form;
