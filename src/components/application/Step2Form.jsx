import React from "react";
import { Formik, Form } from "formik";
import { Box, Container, Typography, Button } from "@mui/material";
import * as Yup from "yup";

import Otp from "./Otp";
const initialValues = {
  otp: "",
};

const validationSchema = Yup.object({
  otp: Yup.string().required("Required"),
});

const Step2Form = ({ handleNext }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleNext}
  >
    {({ isSubmitting }) => (
      <Form>
        <Container>
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
              }}
            >
              Pan Card Verification
            </Typography>
            <Typography
              sx={{
                fontFamily: "-moz-initial",
                fontSize: "2.5vh",
                color: "gray",
              }}
            >
              Step 2/6
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
            <Otp />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{
                color: "white",
                fontWeight: "500",
                fontSize: "1rem",
                lineHeight: "1.5rem",
                mt: 2,
              }}
            >
              Submit
            </Button>
          </Box>
        </Container>
      </Form>
    )}
  </Formik>
);

export default Step2Form;
