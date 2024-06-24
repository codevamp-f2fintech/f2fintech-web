import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Box, Button } from "@mui/material";
import * as Yup from "yup";

const validationSchema = Yup.object({
  field1: Yup.string().required("Required"),
});

const Step5Form = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ isSubmitting }) => (
      <Form>
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
      </Form>
    )}
  </Formik>
);

export default Step5Form;
