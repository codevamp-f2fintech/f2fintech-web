/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
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
  pan: "",
  occupation_type: "",
};
const Step1Form = ({ applicationNumber, setApplicationNumber }) => {
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [getStarted, setGetStarted] = useState(false);    // To toggle form fields display
  const [customerId, setCustomerId] = useState(null);
  const { getLocalStorage, setLocalStorage } = Utility();
  // Generate random application number
  const randomNumberGenerator = () => Math.floor(10000000 + Math.random() * 90000000);
  // Fetch customer ID from localStorage when the component mounts
  useEffect(() => {
    const storedCustomerId = getLocalStorage("newCustomerId");
    if (storedCustomerId) setCustomerId(storedCustomerId);
  }, [getLocalStorage]);
  // Fetch application number using customer ID
  useEffect(() => {
    if (customerId) {
      API.CustomerApplicationAPI.getApplicationById(customerId)
        .then(({ data: response }) => {
          if (response.status === "Success") {
            console.log(response.data.application_no, 'api res');
            setApplicationNumber(response.data.application_no);
          }
        })
        .catch(err => {
          console.log("Error fetching customer ID:", err);
        });
    }
  }, [customerId]);
  // Create a new customer with a loan application
  const create = useCallback(
    (values) => {
      const applicationNumber = randomNumberGenerator();
      const { contact, email, name, status, dob, ...restValues } = values;
      const customer = {
        contact,
        dob,
        email,
        name,
        status,
      };
      API.CustomerAPI.register(customer)
        .then(({ data: res }) => {
          if (res.status === "Success") {
            setCustomerId(res.data.id);
            setLocalStorage("newCustomerId", res.data.id);
            const promise1 = API.CustomerInfoAPI.create({
              customer_id: res.data.id,
              ...restValues,
            });
            const promise2 = API.CustomerApplicationAPI.createApplication({
              customer_id: res.data.id,
              application_no: applicationNumber,
              amount: amount,
              tenure: tenure,
            });
            return Promise.all([promise1, promise2])
              .catch((err) => {
                console.log("Error creating customer info/application:", err);
              });
          } else {
            console.log("Registration failed:", res.message);
          }
        })
        .catch((err) => {
          console.log("Error during registration:", err);
        });
    },
    [amount, tenure]
  );
  // If application number exists, display success message without making user to fill the form again
  if (applicationNumber) {
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
            fontSize: "1.2rem",
            lineHeight: "2rem",
            color: "green",
            fontWeight: "600",
            fontFamily: "cursive",
            marginBottom: 2,
          }}
        >
          Your application is submitted. We will contact you over call in next half an hour.
          To speed up the process, please complete the next steps........
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "gray",
            marginBottom: 2,
          }}
        >
          Your Application Number is <strong>{applicationNumber}</strong>.
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
            <MenuItem value="12">12 Months</MenuItem>
            <MenuItem value="24">24 Months</MenuItem>
            <MenuItem value="36">36 Months</MenuItem>
            <MenuItem value="48">48 Months</MenuItem>
            <MenuItem value="60">60 Months</MenuItem>
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
                    marginBottom: 3,
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
                    marginBottom: 3,
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Enter Date Of Birth"
                    value={values.dob}
                    onChange={(newValue) => setFieldValue("dob", newValue)}
                  />
                </LocalizationProvider>
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
                  <InputLabel>Occupation Type</InputLabel>
                  <Select
                    variant="filled"
                    name="occupation_type"
                    value={values.occupation_type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="salaried">Salaried </MenuItem>
                    <MenuItem value="non-salaried">Non-Salaried</MenuItem>
                  </Select>
                </FormControl>
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
export default Step1Form;