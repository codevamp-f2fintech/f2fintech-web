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
} from "@mui/material";
import { CurrencyRupee as CurrencyRupeeIcon } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import API from "../../apis";
import { Utility } from "../utility";
import * as Yup from "yup";

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": checked && {
    color: theme.palette.primary.main,
  },
}));

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Name should only contain letters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  contact: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Contact number is required"),
  pan: Yup.string()
    .matches(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "PAN must be exactly 10 characters: first 5 letters in uppercase and last 5 digits."
    )
    .required("PAN is required"),
  city: Yup.string().required("City is required"),
  occupation_type: Yup.string().required("Occupation type is required"),
  dob: Yup.date().nullable().required("Date of birth is required"),
});

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
  const [getStarted, setGetStarted] = useState(false);
  const [isValidAmount, setIsValidAmount] = useState(true); 

  const { getLocalStorage, setLocalStorage } = Utility();
  const customerId = getLocalStorage("customerInfo")?.id;

  const randomNumberGenerator = () =>
    Math.floor(10000000 + Math.random() * 90000000);

  useEffect(() => {
    if (customerId) {
      API.CustomerApplicationAPI.getApplicationById(customerId)
        .then(({ data: response }) => {
          if (response.status === "Success") {
            setApplicationNumber(response.data.application_no);
            API.LoanTrackingAPI.getLoanTrackingById(response.data.id).then(
              ({ data: resp }) => {
                if (resp.status === "Success") {
                  setLoanStatus(resp.data.status);
                }
              }
            );
          }
        })
        .catch((err) => {
          console.log("Error fetching customer ID:", err);
        });
    }
  }, [customerId]);

  const create = useCallback(
    (values) => {
      const applicationNumber = randomNumberGenerator();
      const { contact, email, name, status, dob, ...restValues } = values;
      const customer = {
        contact,
        dob,
        email,
        name,
        password: `${name.toLowerCase()}@9876`,
        status,
      };
      if (!customerId) {
        API.CustomerAPI.register(customer)
          .then(async ({ data: res }) => {
            if (res.status === "Success") {
              await API.CustomerInfoAPI.create({
                customer_id: res.data.id,
                ...restValues,
              });
              return res.data.id; 
            } else {
              throw new Error(`Registration failed: ${res.message}`);
            }
          })
          .then((customerId) => {
            return API.CustomerApplicationAPI.createApplication({
              customer_id: customerId,
              application_no: applicationNumber,
              amount: amount,
              tenure: tenure,
            });
          })
          .then(({ data: applicationResponse }) => {
            return API.LoanTrackingAPI.createLoanTracking({
              customer_application_id: applicationResponse.data.applicationId,
              status: "submitted",
            });
          })
          .then(() => {
            API.CustomerAPI.login({
              contact,
              password: `${name.toLowerCase()}@9876`,
            }).then((response) => {
              if (response.data.status === "Success") {
                const customerInfo = {
                  id: response.data.data.id,
                  name: response.data.data.name,
                  token: response.data.data.token,
                };
                setLocalStorage("customerInfo", customerInfo);
                location.reload();
              }
            });
          })
          .catch((err) => {
            console.log("Error during customer creation:", err);
          });
      } else {
        API.CustomerApplicationAPI.createApplication({
          customer_id: customerId,
          application_no: applicationNumber,
          amount: amount,
          tenure: tenure,
        })
          .then(({ data: applicationResponse }) => {
            API.LoanTrackingAPI.createLoanTracking({
              customer_application_id: applicationResponse.data.applicationId,
              status: "submitted",
            });
            location.reload();
          })
          .catch((err) => {
            console.log("Error during customer creation:", err);
          });
      }
    },
    [amount, tenure]
  );

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setIsValidAmount(true);
      setAmount(value);
    } else {
      setIsValidAmount(false);
    }
  };

  if (
    applicationNumber &&
    !(loanStatus === "disbursed" || loanStatus === "rejected")
  ) {
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
          <Link to="/loan-tracker">Track Your Loan Status By Clicking Here</Link>
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
            label="Enter Amount*"
            placeholder="How Much Loan Do You Require?"
            value={amount}
            onChange={handleAmountChange}
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
                border: `1px solid ${isValidAmount ? "transparent" : "#f44336"}`,
                transition: "border-color 0.3s, border-width 0.3s",
                "&:hover": {
                  borderColor: isValidAmount ? "#0000ff" : "#f44336",
                },
                "&.Mui-focused": {
                  borderColor: isValidAmount ? "#0000ff" : "#f44336",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputAdornment-root": {
                color: "#000",
              },
              "& .MuiInputLabel-root": {
                color: isValidAmount ? "initial" : "#f44336",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: isValidAmount ? "#0000ff" : "#f44336",
              },
            }}
            error={!isValidAmount}
            helperText={!isValidAmount ? "Please enter only numbers" : ""}
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
          disabled={!amount || !tenure || !isValidAmount}
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

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
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
                  "& .MuiFilledInput-root": {
                    borderColor:
                      touched.contact && errors.contact
                        ? "#f44336"
                        : "initial",
                    color:
                      touched.contact && !errors.contact
                        ? "#000000"
                        : "#f44336",
                    "&.Mui-focused": {
                      borderColor:
                        touched.contact && !errors.contact
                          ? "#1976d2"
                          : "#f44336",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: touched.contact && errors.contact
                      ? "#f44336"
                      : "initial",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color:
                      touched.contact && !errors.contact
                        ? "#1976d2"
                        : "#f44336",
                  },
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
                error={touched.occupation_type && Boolean(errors.occupation_type)}
              >
                <InputLabel>Occupation Type*</InputLabel>
                <Select
                  variant="filled"
                  name="occupation_type"
                  value={values.occupation_type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="salaried">Salaried</MenuItem>
                  <MenuItem value="non-salaried">Non-Salaried</MenuItem>
                </Select>
                {touched.occupation_type && errors.occupation_type && (
                  <Typography color="error" variant="caption">
                    {errors.occupation_type}
                  </Typography>
                )}
              </FormControl>
              <Box
                sx={{
                  width: "75%",
                  marginBottom: 3,
                }}
                error={touched.dob && Boolean(errors.dob)}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Enter Date Of Birth*"
                    value={values.dob}
                    onChange={(newValue) => setFieldValue("dob", newValue)}
                    onBlur={handleBlur}
                  />
                </LocalizationProvider>
                {touched.dob && errors.dob && (
                  <Typography color="error" variant="caption">
                    {errors.dob}
                  </Typography>
                )}
              </Box>
              <FormGroup
                sx={{ display: "flex", ml: 5, mr: 8, marginBottom: 3 }}
              >
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={
                    <Typography sx={{ fontSize: "0.875rem", color: "gray" }}>
                      I agree to opt for the product and service of F2fintech.
                      By opting for F2fintech, I agree to have read, understood
                      and explicitly consent to the T&C, Privacy Policy and
                      F2fintech Credit Terms.
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
                      I further consent to receive the loan and product updates
                      of F2fintech on WhatsApp and allow F2fintech and/or their
                      authorized third party service providers to contact me for
                      marketing purposes via SMS, Telephone, Email, or any other
                      means.
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
  );
};

Step1Form.propTypes = {
  applicationNumber: PropTypes.any,
  setApplicationNumber: PropTypes.func.isRequired,
};

export default Step1Form;
