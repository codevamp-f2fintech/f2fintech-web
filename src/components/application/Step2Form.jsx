import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Box, Container, Typography, Button } from "@mui/material";
import * as Yup from "yup";

const validationSchema = Yup.object({
  field1: Yup.string().required("Required"),
});

const Step2Form = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
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
            <TextField
              // as={TextField}
              disableUnderline={true}
              variant="filled"
              name="field1"
              label="Name"
              sx={{
                width: "75%",
                height: "50px",
                fontSize: "16px",
                borderRadius: "10px",
                overflow: "hidden",
              }}
              fullWidth
            />
            <ErrorMessage
              name="field1"
              component="div"
              style={{ color: "red" }}
            />
          </Box>
        </Container>
      </Form>
    )}
  </Formik>
);

export default Step2Form;
