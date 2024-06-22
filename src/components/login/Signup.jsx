import { TextField, Button, Box, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot be more than 20 characters")
    .required("Password is required"),
});

export default function Signup({ isSignUp }) {
  return (
    <Box
      sx={{
        backgroundImage: "url('login0012.jpg')",
        width: "50%",
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
          justifyContent: "space-evenly",
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
          initialValues={{ phoneNumber: "", password: "" }}
          validationSchema={SignUpSchema}
          onSubmit={async (formData, { setSubmitting }) => {
            try {
              const response = await fetch("YOUR_API_ENDPOINT", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },

                body: JSON.stringify(formData),
              });

              if (!response.ok) {
                throw new Error("Network response was not ok");
              }

              const data = await response.json();
              console.log(data);
            } catch (error) {
              console.error(
                "There was a problem with the fetch operation:",
                error
              );
            } finally {
              setSubmitting(false);
            }
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
                name="phoneNumber"
                label="Enter your number"
                type="number"
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
                name="password"
                label="Enter your password"
                type="password"
                variant="filled"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                inputProps={{ minLength: 6, maxLength: 20 }}
                InputProps={{
                  disableUnderline: true,
                  sx: { width: "25rem" },
                }}
                sx={{ borderRadius: "20px", overflow: "hidden" }}
                error={touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
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
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
