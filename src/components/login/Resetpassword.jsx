import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "../toast/Toast";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .required("Current password is required")
    .min(6, "Password must be at least 6 characters"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

export default function ResetPassword() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [open, setOpen] = useState(false); //
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setError(null);
      setSuccess(null);

      const customerInfo = localStorage.getItem("customerInfo");

      const customerId = JSON.parse(customerInfo).id;

      // console.log("customerId", JSON.parse(customerInfo), customerId);
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/reset-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customerId,
              currentPassword: values.currentPassword,
              newPassword: values.newPassword,
            }),
          }
        );

        const result = await response.json();
        console.log("result", result, "res>>", response);

        if (response.ok) {
          setSuccess(result.message);
          setOpen(true);
          setTimeout(() => {
            navigate("/login"); // Redirect to login page after 3 seconds
          }, 1000);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("Failed to reset password");
      }
    },
  });
  //

  const handleClickShowPassword = (field) => {
    switch (field) {
      case "currentPassword":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "newPassword":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirmPassword":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };
  const handleClose = () => {
    setOpen(false); // Function to close the toast
    resetForm();
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 !important",
        backgroundImage: "url('commonback.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "100vh",
          height: "70vh",
          width: "100vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "3vw",
            fontWeight: "700",
            fontFamily: "verdana",
            textAlign: "center",
            lineHeight: "1.75rem",
            marginBottom: "5vh",
          }}
        >
          Reset Password
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            width: "100%",
            maxWidth: 400,
          }}
        >
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <TextField
            name="currentPassword"
            type={showCurrentPassword ? "text" : "password"}
            label="Current Password"
            variant="filled"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              disableUnderline: true,
              sx: {
                width: "25rem",
                borderRadius: "20px",
                backgroundColor: "darkGray",
                fontSize: "1vw",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("currentPassword")}
                    edge="end"
                  >
                    {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              borderRadius: "20px",
              overflow: "hidden",
            }}
            error={
              formik.touched.currentPassword &&
              Boolean(formik.errors.currentPassword)
            }
            helperText={
              formik.touched.currentPassword && formik.errors.currentPassword
            }
          />
          <TextField
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            label="New Password"
            variant="filled"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              disableUnderline: true,
              sx: {
                width: "25rem",
                borderRadius: "20px",
                backgroundColor: "darkGray",
                fontSize: "1vw",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("newPassword")}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              borderRadius: "20px",
              overflow: "hidden",
            }}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            label="Confirm New Password"
            variant="filled"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputProps={{
              disableUnderline: true,
              sx: {
                width: "25rem",
                borderRadius: "20px",
                backgroundColor: "darkGray",
                fontSize: "1vw",
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleClickShowPassword("confirmPassword")}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              borderRadius: "20px",
              overflow: "hidden",
            }}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: "500",
              fontSize: "1rem",
              lineHeight: "1.5rem",
              width: "30vh",
              height: "5.5vh",
              borderRadius: "20px",
            }}
          >
            Submit
          </Button>
          <Toast
            msg={"Password successfully changed"} // Message to display on success
            open={open} // State to control visibility
            setOpen={setOpen} // Function to control state
            handleClose={handleClose} // Function to close the toast
            anchorOrigin={{ vertical: "top", horizontal: "left" }} // Position of the toast
          />
        </Box>
      </Box>
    </Container>
  );
}
