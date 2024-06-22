import { TextField, Button, Box, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot be more than 20 characters")
    .required("Password is required"),
});

export default function Signin({ isSignUp }) {
  return (
    <Box
      sx={{
        backgroundImage: "url('login11.png')",
        width: "40%",
        height: "100vh",
        backgroundPosition: "top",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#EEEEEE",
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
          initialValues={{ phoneNumber: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={(formData) => {
            console.log(formData);
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
                label="Phone Number"
                type="number"
                name="phoneNumber"
                variant="filled"
                autoComplete="off"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                inputProps={{
                  maxLength: 10,
                }}
                InputProps={{
                  disableUnderline: true,
                  sx: { width: "25rem" },
                }}
                sx={{
                  borderRadius: "20px",
                  overflow: "hidden",
                }}
                error={touched.phoneNumber && !!errors.phoneNumber}
                helperText={touched.phoneNumber && errors.phoneNumber}
              />
              <TextField
                label="Enter your password"
                type="password"
                variant="filled"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                InputProps={{
                  disableUnderline: true,
                  sx: { width: "25rem" },
                }}
                sx={{ borderRadius: "20px", overflow: "hidden" }}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                Forgot Pasword? <span> Click here</span>
              </Button>
              <Button
                variant="contained"
                type="submit"
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
      </Box>
    </Box>
  );
}
