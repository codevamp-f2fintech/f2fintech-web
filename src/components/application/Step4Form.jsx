import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { TextField, Box, Typography } from "@mui/material";
import * as Yup from "yup";

import ImagePicker from "../image/ImagePicker";

const validationSchema = Yup.object({
  field1: Yup.string().required("Required"),
});

const Step4Form = ({ initialValues, onSubmit }) => {
  const [aadharFront, setAadharFront] = useState([]);
  const [aadharBack, setAadharBack] = useState([]);
  const [passportSizePhoto, setPassportSizePhoto] = useState([]);

  return (
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
            <Typography
              sx={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "bold 10px",
                fontSize: "4vh",
                fontWeight: "300vh",
              }}
            >
              Profile Details and Proof
            </Typography>
            <Typography
              sx={{
                fontFamily: "-moz-initial",
                fontSize: "2.5vh",
                color: "gray",
              }}
            >
              Step 4/6
            </Typography>
            <TextField
              disableUnderline={true}
              type="number"
              variant="filled"
              name="aadhar_number"
              label="Aadhar Number"
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
            <Typography
              sx={{
                fontFamily: "-moz-initial",
                fontSize: "3vh",
                color: "black",
              }}
            >
              Aadhar Card
            </Typography>
            <ImagePicker
              preview={aadharFront}
              setPreview={setAadharFront}
              label="Aadhar Front"
            />
            <ImagePicker
              preview={aadharBack}
              setPreview={setAadharBack}
              label="Aadhar Back"
            />
            <Typography
              sx={{
                fontFamily: "-moz-initial",
                fontSize: "3vh",
                color: "black",
              }}
            >
              Passport Size Photo
            </Typography>
            <ImagePicker
              preview={passportSizePhoto}
              setPreview={setPassportSizePhoto}
              label="Passport Size Photo"
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Step4Form;
