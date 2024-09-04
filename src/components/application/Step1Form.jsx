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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [openDialog, setOpenDialog] = useState(false); // Popup control

  console.log(amount, tenure, "value");

  const create = useCallback(
    (values) => {
      const { contact, email, name, status, dob, ...restValues } = values;
      const customer = {
        contact,
        dob,
        email,
        name,
        status,
      };
      
      // Display the dialog when form is successfully submitted
      setOpenDialog(true); // Test if the dialog opens

      API.CustomerAPI.register(customer)
        .then(({ data: res }) => {
          if (res.status === "Success") {
            const promise1 = API.CustomerInfoAPI.create({
              customer_id: res.data.id,
              ...restValues,
            });
            const promise2 = API.CustomerApplicationAPI.createApplication({
              customer_id: res.data.id,
              amount,
              tenure,
            });
            return Promise.all([promise1, promise2])
              .then(() => {
                setOpenDialog(true); // Show the dialog on success
              })
              .catch((err) => {
                console.log("Error in creating customer info or application:", err);
              });
          } else {
            console.error("Registration failed:", res.message);
          }
        })
        .catch((err) => {
          // Handle network error
          if (err.message === "Network Error") {
            console.error("Network error. Backend server might be down or unreachable.");
            alert("Network error. Please try again later.");
          } else {
            console.error("Error during registration:", err);
          }
        });
    },
    [amount, tenure]
  );

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
    margin: theme.spacing(1),
  }));

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
          disabled={!amount && !tenure}
          type="submit"
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

                <Dialog
                  open={openDialog}
                  onClose={() => setOpenDialog(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Application Submitted"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Your application is submitted, and we will connect with
                      you over a call in the next half an hour.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setOpenDialog(false)}
                      color="primary"
                      autoFocus
                    >
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>

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
