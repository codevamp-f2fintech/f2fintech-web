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

import PropTypes from "prop-types";

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
  dob: null,
  pan: "",
  occupation_type: "",
};

const Step1Form = ({ setLoanType }) => {
  const [amount, setAmount] = useState("");
  const [tenure, setTenure] = useState("");
  const [getStarted, setGetStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [applicationNumber, setApplicationNumber] = useState(0);

  const randomNumberGenerator = () => {
    return Math.floor(10000000 + Math.random() * 90000000);
  };  

  const create = useCallback(
    (values) => {
      const applicationNumber = randomNumberGenerator();
      setApplicationNumber(applicationNumber);
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
              .then(() => {
                setIsSubmitted(true); 
              })
              .catch((err) => {
                console.log("Error in creating customer info or application:", err);
              });
          } else {
            console.error("Registration failed:", res.message);
          }
        })
        .catch((err) => {
          console.error("Error during registration:", err);
        });
    },
    [amount, tenure]
  );

  if (isSubmitted) {
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
        <Typography variant="h5" sx={{ color: "green", marginBottom: 2 }}>
          Your application is submitted successfully!
        </Typography>
        <Typography variant="body1">
          We will connect with you over call in the next half an hour.
          <br />
          Your Application Number is {applicationNumber}.
        </Typography>
      </Box>
    );
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
