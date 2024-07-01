import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Toast from "../toast/Toast";

import axiosClient from "../../api/apiClient";

const SignInSchema = Yup.object().shape({
  contact: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required(" number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot be more than 20 characters")
    .required("Password is required"),
});

export default function Signin({ isSignUp }) {
  const [loading, setLoading] = useState(false); //1 . false (default)  2. on btn click true. 3.on response false
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordContact, setForgotPasswordContact] = useState("");
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (formData, resetForm) => {
    console.log("calling api");
    axiosClient.post("/login", JSON.stringify(formData)).then((response) => {
      console.log("api respo>>>", response);
      setLoading(false);
      if (response.data.status === "Success") {
        console.log("api respo>>>2", response);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("id", response.data.data.id);
        setOpen(true);
        resetForm();
        setTimeout(() => {
          navigate("/"); // Redirect to sign-in page after 3 seconds
        }, 1000);
      }
    });
  };
  //
  const handleForgotPassword = () => {
    setForgotPasswordOpen(true);
  };

  const handleForgotPasswordSubmit = () => {
    setLoading(true);
    axiosClient
      .post("/forgot-password", { contact: forgotPasswordContact })
      .then((response) => {
        console.log("forgot password respo", response);
        setLoading(false);
        setForgotPasswordOpen(false);
        if (response.data.status === "Success") {
          setOpen(true);
        }
      });
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
        backgroundImage: "url('logo0000.jfif')",
        width: "49.5%",
        height: "100vh",
        backgroundPosition: "bottom",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "0% 30% 30% 0%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          zIndex: 1,
          ...(isSignUp && {
            visibility: "hidden",
            opacity: 0,
            transition: "visibility 0s linear 500ms,opacity 500ms",
          }),
          ...(!isSignUp && {
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
          Sign In
        </Typography>
        <Formik
          initialValues={{ contact: "", password: "" }}
          validationSchema={SignInSchema}
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
                label="*Contact Number"
                type="number"
                name="contact"
                variant="filled"
                autoComplete="off"
                value={values.contact}
                onChange={handleChange}
                onBlur={handleBlur}
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
                label="*Password"
                type={showPassword ? "text" : "password"}
                variant="filled"
                name="password"
                value={values.password}
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
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />

              <Button
                onClick={handleForgotPassword}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  color: "black",
                }}
              >
                Forgot Pasword? <span> Click here</span>
              </Button>

              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{
                  color: "white",
                  fontWeight: "500",
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                }}
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>

        {forgotPasswordOpen && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              mt: 4,
            }}
          >
            <Typography
              sx={{
                fontSize: "1.5vw",
                fontWeight: "400",
                fontFamily: "verdana",
                textAlign: "center",
                lineHeight: "1.5rem",
              }}
            >
              Forgot Password
            </Typography>
            <TextField
              label="*Contact Number"
              type="number"
              variant="filled"
              autoComplete="off"
              value={forgotPasswordContact}
              onChange={(e) => setForgotPasswordContact(e.target.value)}
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
            />
            <Button
              variant="contained"
              onClick={handleForgotPasswordSubmit}
              disabled={loading}
              sx={{
                color: "white",
                fontWeight: "500",
                fontSize: "1rem",
                lineHeight: "1.5rem",
              }}
            >
              Submit
            </Button>
          </Box>
        )}
        <Toast
          msg={"Signin successfully"}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
        />
      </Box>
    </Box>
  );
}
