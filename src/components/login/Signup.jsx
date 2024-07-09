import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Toast from "../toast/Toast";

import axiosClient from "../../api/apiClient";

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  contact: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot be more than 20 characters")
    .required("Password is required")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number"),
  gender: Yup.string().required("Gender is required"),
});

export default function Signup({ isSignUp, setIsSignUp }) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    let timer;
    if (showError) {
      timer = setTimeout(() => {
        setShowError(null);
      }, 3000); // 3000 ms = 3 seconds
    }
    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts or showError changes
  }, [showError]);

  //
  const handleSubmit = async (formData, resetForm) => {
    setLoading(true);
    try {
      const response = await axiosClient.post(
        "/create-customer",
        JSON.stringify(formData)
      );
      setLoading(false);
      if (response.data.status === "Success") {
        setOpen(true);
        resetForm();
        setIsSignUp(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 409) {
        console.log("Phone number already registered", error);
        setShowError("Phone number already registered");
      } else {
        console.error("Signup error", error);
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        backgroundImage: "url('logo00.jpg')",
        width: "49.4%",
        borderRadius: "30% 0% 0% 30%",
        height: "100vh",
        backgroundPosition: "top",
        margin: "auto",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: "50vh",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          zIndex: 1,
          ...(!isSignUp && {
            visibility: "hidden",
            opacity: 0,
            transition: "visibility 0s linear 500ms,opacity 500ms",
          }),
          ...(isSignUp && {
            visibility: "visible",
            opacity: 1,
            transition: "visibility 0s linear 0s,opacity 500ms",
          }),
        }}
      >
        <Typography
          sx={{
            fontSize: "2.3vw",
            fontweight: "400",
            fontFamily: "verdana",
            textAlign: "center",
            lineHeight: "1.75rem",
          }}
        >
          Create Account
        </Typography>
        <Formik
          initialValues={{
            contact: "",
            password: "",
            name: "",
            email: "",
            gender: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={(formData, { resetForm }) => {
            setLoading(true);
            handleSubmit(formData, resetForm);
            console.log(formData, "formData");
          }}
        >
          {({
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            values,
            setErrors,
          }) => (
            <Form
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <TextField
                name="name"
                label="*Full Name"
                type="text"
                variant="filled"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    width: "25rem",
                    borderRadius: "20px",
                    backgroundColor: "darkGray",
                  },
                }}
                sx={{ borderRadius: "20px", overflow: "hidden" }}
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              <TextField
                name="contact"
                label="*Contact Number"
                type="number"
                variant="filled"
                autoComplete="off"
                value={values.contact}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{
                  maxLength: 10,
                }}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    width: "25rem",
                    borderRadius: "20px",
                    backgroundColor: "darkGray",
                  },
                }}
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
                error={touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
              />
              <TextField
                name="password"
                label="*Password"
                type={showPassword ? "text" : "password"}
                variant="filled"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                inputProps={{
                  minLength: 6,
                  maxLength: 20,
                  backgroundColor: "darkGray",
                }}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    width: "25rem",
                    borderRadius: "20px",
                    backgroundColor: "darkGray",
                  },

                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ borderRadius: "20px", overflow: "hidden" }}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                variant="filled"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    width: "25rem",
                    borderRadius: "20px",
                    backgroundColor: "darkGray",
                  },
                }}
                sx={{ borderRadius: "20px", overflow: "hidden" }}
                error={touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <FormControl
                variant="filled"
                sx={{
                  width: "25rem",
                  borderRadius: "20px",
                  overflow: "hidden",
                  "& .MuiFilledInput-root": {
                    backgroundColor: "none",
                    "&:before, &:after": {
                      borderBottom: "none",
                    },
                    "&:hover:not(.Mui-disabled):before": {
                      borderBottom: "none",
                    },
                  },
                }}
                error={touched.gender && !!errors.gender}
              >
                <InputLabel>*Gender</InputLabel>
                <Select
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disableUnderline
                  sx={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    backgroundColor: "darkGray",
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {touched.gender && errors.gender && (
                  <Typography
                    color="error"
                    variant="caption"
                    marginLeft="15px"
                    marginTop="5px"
                  >
                    {errors.gender}
                  </Typography>
                )}
              </FormControl>

              {showError && <div style={{ color: "red" }}>{showError}</div>}

              <Button
                variant="contained"
                disabled={loading}
                type="submit"
                sx={{
                  color: "white",
                  fontWeight: "500",
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                }}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
        <Toast
          msg={"Signup successfully"}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        />
      </Box>
    </Box>
  );
}
