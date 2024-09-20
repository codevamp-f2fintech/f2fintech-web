/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { Box, TextField, Typography, Button, IconButton, Tooltip } from "@mui/material";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import * as Yup from "yup";

import API from "../../apis";

import { Utility } from "../utility";

const validationSchema = Yup.object({
  aadharFront: Yup.mixed().required("Required"),
  aadharBack: Yup.mixed().required("Required"),
  passportSizePhoto: Yup.mixed().required("Required"),
});

const initialValues = {
  aadharFront: null,
  aadharBack: null,
  passportSizePhoto: null,
};

const FileInput = ({ name, label, preview, onFileChange, onDelete }) => (
  <>
    <Typography sx={{ fontFamily: "-moz-initial", fontSize: "2.5vh", color: "black" }}>
      {label}
    </Typography>
    <TextField
      accept="image/*, application/pdf"
      name="file"
      label="Upload"
      size="small"
      InputProps={{
        startAdornment: (
          <IconButton component="label" sx={{ width: "92%" }}>
            <AddPhotoAlternateIcon />
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(event) => onFileChange(event, name)}
            />
          </IconButton>
        ),
      }}
      sx={{ m: 1, outline: "none", width: "35%" }}
    />
    {preview && (
      <Box sx={{ mt: 2, width: "40%", textAlign: "center", position: "relative" }}>
        <img src={preview} alt={label} style={{ maxWidth: "100%", height: "auto" }} />
        <IconButton
          onClick={() => onDelete(name)}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            transform: "translate(50%, -50%)",
            borderRadius: "50%",
            padding: "5px"
          }}
        >
          <Tooltip title="DELETE">
            <DeleteIcon
              sx={{
                color: "#002147",
                "&:hover": {
                  color: "red",
                  fontSize: "1.5rem",
                  transition: "all 0.3s ease-in-out",
                },
              }}
            />
          </Tooltip>
        </IconButton>
      </Box>
    )}
    <ErrorMessage name={name} component="div" style={{ color: "red" }} />
  </>
);

const Step4Form = () => {
  const [previews, setPreviews] = useState({
    aadharFront: "",
    aadharBack: "",
    passportSizePhoto: "",
  });

  const { formatName, getLocalStorage } = Utility();
  const customerId = getLocalStorage("customerInfo")?.id;

  const uploadFileToS3 = (file, type) => {
    const formattedName = formatName(file.name);
    API.DocumentAPI.uploadDocument({
      document: file,
      folder: `document/${formattedName}`,
    })
      .then((res) => {
        if (res.data.status === "Success") {
          API.DocumentAPI.createDocument({
            document_url: res.data.data,
            customer_id: customerId,
            type: type
          });
          console.log(`Document of ${type} uploaded successfully`);
        } else {
          console.error("Upload failed");
        }
      })
      .catch((err) => {
        console.error("Error in document creation:", err);
      });
  };

  const handleFormSubmit = useCallback(async (values) => {
    const uploadPromises = [];

    if (values.aadharFront) {
      uploadPromises.push(uploadFileToS3(values.aadharFront, "aadhaar front"));
    }
    if (values.aadharBack) {
      uploadPromises.push(uploadFileToS3(values.aadharBack, "aadhaar back"));
    }
    if (values.passportSizePhoto) {
      uploadPromises.push(uploadFileToS3(values.passportSizePhoto, "photo"));
    }

    try {
      await Promise.all(uploadPromises);
      console.log("All documents uploaded successfully");
    } catch (err) {
      console.log("Error in uploading one or more documents:", err);
    }
  }, [customerId]);

  const handleFileChange = (event, name) => {
    const file = event.target.files[0];
    if (file) {
      setPreviews((prev) => ({ ...prev, [name]: URL.createObjectURL(file) }));
    }
  };

  const handleDelete = (name) => {
    setPreviews((prev) => ({ ...prev, [name]: "" }));
  };


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        dirty,
        isSubmitting,
        handleSubmit,
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
              Step 3/3
            </Typography>

            {/* Aadhar Card Front */}
            <FileInput
              name="aadharFront"
              label="Aadhar Card Front"
              preview={previews.aadharFront}
              onFileChange={(event) => {
                handleFileChange(event, "aadharFront");
                setFieldValue("aadharFront", event.target.files[0]);
              }}
              onDelete={() => {
                handleDelete("aadharFront");
                setFieldValue("aadharFront", null);
              }}
            />

            {/* Aadhar Card Back */}
            <FileInput
              name="aadharBack"
              label="Aadhar Card Back"
              preview={previews.aadharBack}
              onFileChange={(event) => {
                handleFileChange(event, "aadharBack");
                setFieldValue("aadharBack", event.target.files[0]);
              }}
              onDelete={() => {
                handleDelete("aadharBack");
                setFieldValue("aadharBack", null);
              }}
            />

            {/* Passport Size Photo */}
            <FileInput
              name="passportSizePhoto"
              label="Passport Size Photo"
              preview={previews.passportSizePhoto}
              onFileChange={(event) => {
                handleFileChange(event, "passportSizePhoto");
                setFieldValue("passportSizePhoto", event.target.files[0]);
              }}
              onDelete={() => {
                handleDelete("passportSizePhoto");
                setFieldValue("passportSizePhoto", null);
              }}
            />

            <Button
              color="primary"
              disabled={!dirty || isSubmitting}
              type="submit"
              variant="contained"
              sx={{ color: "white", fontWeight: "500", fontSize: "1rem", lineHeight: "1.5rem", mt: 2, ml: 1 }}
            >
              Upload
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

FileInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  preview: PropTypes.string,
  onFileChange: PropTypes.func,
  onDelete: PropTypes.func
};

export default Step4Form;
