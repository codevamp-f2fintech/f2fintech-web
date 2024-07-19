import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Card,
  Typography,
  TextField,
  Button,
  Avatar,
  Container,
  CircularProgress,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // Import Yup for validation

import API from "../../apis";
import Toast from "../toast/Toast";
import { Utility } from "../utility";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  contact: Yup.string().required("Contact is required"),
});

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const toastInfo = useSelector((state) => state.toastInfo);
  const { getLocalStorage, toastAndNavigate } = Utility();
  const customerId = getLocalStorage("customerInfo")?.id;
  const isMobile = useMediaQuery("(max-width:480px)");
  const isTab = useMediaQuery("(max-width:820px)");

  useEffect(() => {
    setLoading(true);
    API.CustomerAPI.getCustomerProfile(customerId)
      .then(({ data }) => {
        if (data.status === "Success") {
          setUserData(data.data.customer);
        }
      })
      .catch((err) => {
        console.log(err, "API response error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [!editMode]);

  const handleSubmit = (formData, resetForm) => {
    console.log("handlesubmit", formData);
    setLoading(true);
    API.CustomerAPI.updateCustomerProfile({
      ...formData,
      customerId,
    })
      .then((res) => {
        console.log("response", res);
        if (res.status === "Success") {
          setEditMode(false);
          resetForm();
          console.log("tosttest");
          toastAndNavigate(
            dispatch,
            true,
            "success",
            "Updated Successfully"
            // navigateTo,
            // "/"
          );
        }
      })
      .catch((err) => {
        console.log(err, "Error updating customer profile:");
        if (err) {
          setOpen(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <Container
        maxWidth={false}
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 !important",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  console.log("userData", userData);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        background:
          "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(6,55,158,1) 100%)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card
        sx={{
          height: "64vh",
          width: "80vw",
          maxWidth: "100%",
          textAlign: "center",
          mx: "auto",
          mt: 5,
          backgroundImage: "url('profilenawa.avif')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          borderRadius: "40px",
          backgroundColor: "#b3ffe0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            // top: "25.5vh",
            // left: "50vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "12vh",
            }}
          >
            <Formik
              initialValues={{
                name: userData?.name || "",
                email: userData?.email || "",
                gender: userData?.gender || "",
                contact: userData?.contact || "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                console.log("value");
                handleSubmit(values, resetForm);
              }}
            >
              {({ values, handleChange, errors, touched }) => (
                <Form
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    // gap: 10,
                  }}
                >
                  {editMode ? (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          // alignItems: "center",
                          textAlign: "center",
                          gap: 2,
                          marginLeft: "92vh",
                          // border: "2px solid ",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "monospace",
                            fontSize: "3vw",
                            fontWeight: "500",
                            marginRight: "50vh",
                          }}
                        >
                          Edit
                        </Typography>
                        <Field
                          as={TextField}
                          name="name"
                          label="Name"
                          autoComplete="off"
                          fullWidth
                          onChange={handleChange}
                          value={values.name}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonIcon />
                              </InputAdornment>
                            ),
                            sx: {
                              width: "25rem",
                              borderRadius: "20px",
                              fontSize: "1.2vw",
                              backgroundColor: "darkGray",
                            },
                          }}
                          InputLabelProps={{
                            style: { color: "black" }, // Change the color to your desired color
                          }}
                          error={touched.name && !!errors.name}
                          helperText={touched.name && errors.name}
                        />
                        <Field
                          as={TextField}
                          name="email"
                          label="Email"
                          autoComplete="off"
                          fullWidth
                          onChange={handleChange}
                          value={values.email}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon />
                              </InputAdornment>
                            ),
                            sx: {
                              width: "25rem",
                              borderRadius: "20px",
                              fontSize: "1.2vw",
                              backgroundColor: "darkGray",
                            },
                          }}
                          InputLabelProps={{
                            style: { color: "black" }, // Change the color to your desired color
                          }}
                          error={touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                        />
                        <FormControl
                          sx={{
                            width: "25rem",
                            borderRadius: "20px",
                            backgroundColor: "darkGray",
                          }}
                        >
                          <InputLabel sx={{ color: "black" }}>
                            Gender
                          </InputLabel>
                          <Field
                            as={Select}
                            name="gender"
                            fullWidth
                            onChange={handleChange}
                            value={values.gender}
                            disableUnderline
                            sx={{
                              width: "25rem",
                              borderRadius: "20px",
                              fontSize: "1vw",
                            }}
                            error={touched.gender && !!errors.gender}
                            helperText={touched.gender && errors.gender}
                          >
                            <MenuItem sx={{}} value="male">
                              Male
                            </MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                          </Field>
                        </FormControl>
                        <Field
                          as={TextField}
                          name="contact"
                          label="Contact"
                          fullWidth
                          onChange={handleChange}
                          value={values.contact}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneAndroidIcon />
                              </InputAdornment>
                            ),
                            sx: {
                              width: "25rem",
                              borderRadius: "20px",
                              fontSize: "1.2vw",
                              backgroundColor: "darkGray",
                            },
                          }}
                          InputLabelProps={{
                            style: { color: "black" }, // Change the color to your desired color
                          }}
                          error={touched.contact && !!errors.contact}
                          helperText={touched.contact && errors.contact}
                        />

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "25rem",
                            mt: 2,
                            position: "absolute",
                            top: "59vh",
                          }}
                        >
                          <Button
                            sx={{
                              width: "10rem",
                              height: "5.5vh",
                              fontSize: "1vw",
                              borderRadius: "20px",
                              boxShadow:
                                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                              ":hover": {
                                transform: "scale(1.1)",
                                transition: "all 300ms ease-in-out",
                              },
                            }}
                            variant="contained"
                            type="submit"
                          >
                            Save
                          </Button>
                          <Button
                            sx={{
                              width: "10rem",
                              borderRadius: "20px",
                              height: "5.5vh",
                              fontSize: "1vw",
                              boxShadow:
                                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                              ":hover": {
                                transform: "scale(1.1)",
                                transition: "all 300ms ease-in-out",
                              },
                            }}
                            variant="contained"
                            onClick={() => setEditMode(false)}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Container>
                        <Box>
                          <Avatar
                            sx={{
                              width: "30vh",
                              height: "30vh",
                              fontSize: "5vw",
                              marginLeft: "54vh",
                              position: "absolute",
                              marginTop: "-7vh",
                              boxShadow:
                                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                              ":hover": {
                                transform: "scale(1.1)",
                                transition: "all 300ms ease-in-out",
                              },
                            }}
                            alt={values.name}
                            src="/"
                          />
                        </Box>
                        <Box
                          sx={{
                            width: "80vh",
                            height: "40vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            // textAlign: "center",
                            gap: 2,
                            marginTop: "20vh",
                            marginLeft: "75vh",
                            // border: "2px solid",
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              fontFamily: "monospace",
                              fontSize: "2vw",
                              borderRadius: "10%",
                              ":hover": {
                                transform: "scale(1.1)",
                                background: "white",
                                transition: "all 300ms ease-in-out",
                              },
                            }}
                          >
                            {userData?.name}
                          </Typography>
                          {!userData?.email ? (
                            <Box color="transparent">------</Box>
                          ) : (
                            <Typography
                              variant="h6"
                              sx={{
                                color: "black",
                                fontSize: "1.2vw",
                                borderRadius: "10%",
                                ":hover": {
                                  transform: "scale(1.1)",
                                  background: "white",
                                  transition: "all 300ms ease-in-out",
                                },
                              }}
                            >
                              {userData?.email}
                            </Typography>
                          )}
                          <Typography
                            variant="h6"
                            sx={{
                              color: "black",
                              fontSize: "1.2vw",
                              borderRadius: "10%",
                              ":hover": {
                                transform: "scale(1.1)",
                                background: "white",
                                transition: "all 300ms ease-in-out",
                              },
                            }}
                          >
                            {userData?.contact}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              color: "black",
                              fontSize: "1.2vw",
                              borderRadius: "10%",
                              ":hover": {
                                transform: "scale(1.1)",
                                background: "white",
                                transition: "all 300ms ease-in-out",
                              },
                            }}
                          >
                            {userData?.gender}
                          </Typography>
                          <Button
                            type="button"
                            variant="contained"
                            sx={{
                              mt: 3,
                              width: "20vh",
                              height: "5.5vh",
                              borderRadius: "20px",
                              fontSize: "1vw",
                              position: "absolute",
                              top: "58vh",
                              boxShadow:
                                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                              ":hover": {
                                transform: "scale(1.1)",
                                transition: "all 300ms ease-in-out",
                              },
                            }}
                            onClick={() => setEditMode(true)}
                          >
                            Edit Profile
                          </Button>
                        </Box>
                      </Container>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Card>
      <Toast
        alerting={toastInfo.toastAlert}
        message={toastInfo.toastMessage}
        severity={toastInfo.toastSeverity}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Container>
  );
}
