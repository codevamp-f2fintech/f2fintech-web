import React, { useCallback, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { TextField, Box, Typography, Button, IconButton ,Tooltip} from "@mui/material";
import * as Yup from "yup";
import API from "../../apis";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import { Utility } from "../utility";

const validationSchema = Yup.object({
  aadharFront: Yup.mixed().required("Required"),
  aadharBack: Yup.mixed().required("Required"),
  passportSizePhoto: Yup.mixed().required("Required"),
});

const initialValues = {
  aadharFront: "",
  aadharBack: "",
  passportSizePhoto: "",
};

const Step4Form = ({ handleNext }) => {
  const [previewAadharFront, setPreviewAadharFront] = useState("");
  const [previewAadharBack, setPreviewAadharBack] = useState("");
  const [previewPassportSizePhoto, setPreviewPassportSizePhoto] = useState("");

  const { formatName, getLocalStorage } = Utility();

  const customerId = getLocalStorage("customerInfo")?.id;

  const handleFormSubmit = useCallback((values) => {
    const uploadFileToS3 = (file, folderName) => {
      const formattedName = formatName(file.name);
      API.DocumentAPI.uploadDocument({
        document: file,
        folder: `profile/${formattedName}`,
      })
        .then((res) => {
          if (res.data.status === "Success") {
            API.DocumentAPI.createDocument({
              document_url: res.data.data,
              customer_id: customerId,
            })
              .then(() => {
                console.log("Document created successfully");
              })
              .catch((err) => {
                console.error("Error in creating document in DB", err);
              });
          } else {
            console.error("Upload failed");
          }
        })
        .catch((err) => {
          console.error("Error in upload:", err);
        });
    };

    if (values.aadharFront) {
      uploadFileToS3(values.aadharFront, "aadhar_front");
    }

    if (values.aadharBack) {
      uploadFileToS3(values.aadharBack, "aadhar_back");
    }

    if (values.passportSizePhoto) {
      uploadFileToS3(values.passportSizePhoto, "passport_photo");
    }
  }, [customerId]);

  const handleFileChange = (event, setFieldValue, setPreview) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDelete = (setFieldValue, setPreview) => {
    setFieldValue("");
    setPreview("");
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
        handleBlur,
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
              Step 4/5
            </Typography>

            {/* Aadhar Card Front */}
            <Typography
              sx={{
                fontFamily: "-moz-initial",
                fontSize: "2.5vh",
                color: "black",
              }}
            >
              Aadhar Card Front
            </Typography>
            <Box sx={{ width: "40%", textAlign: "center", border: "1px solid gray" }}>
              <IconButton component="label">
                <AddPhotoAlternateIcon />
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    handleFileChange(event, (file) => setFieldValue("aadharFront", file), setPreviewAadharFront)
                  }
                />
              </IconButton>
            </Box>
            {previewAadharFront && (
              <Box sx={{ mt: 2, width: "40%", textAlign: "center", position: "relative" }}>
                <img src={previewAadharFront} alt="Aadhar Front Preview" style={{ maxWidth: "100%", height: "auto" }} />
                <IconButton
                  onClick={() => handleDelete(() => setFieldValue("aadharFront", ""), setPreviewAadharFront)}
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    transform: "translate(50%, -50%)",
                    // backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "5px",
                    // "&:hover": {
                    //   backgroundColor: "#f5f5f5",
                    // },
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
            <ErrorMessage name="aadharFront" component="div" style={{ color: "red" }} />

            {/* Aadhar Card Back */}
            <Typography sx={{ fontFamily: "-moz-initial", fontSize: "2.5vh", color: "black" }}>
              Aadhar Card Back
            </Typography>
            <Box sx={{ width: "40%", textAlign: "center", border: "1px solid gray" }}>
              <IconButton component="label">
                <AddPhotoAlternateIcon />
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    handleFileChange(event, (file) => setFieldValue("aadharBack", file), setPreviewAadharBack)
                  }
                />
              </IconButton>
            </Box>
            {previewAadharBack && (
              <Box sx={{ mt: 2, width: "40%", textAlign: "center", position: "relative" }}>
                <img src={previewAadharBack} alt="Aadhar Back Preview" style={{ maxWidth: "100%", height: "auto" }} />
                <IconButton
                  onClick={() => handleDelete(() => setFieldValue("aadharBack", ""), setPreviewAadharBack)}
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    transform: "translate(50%, -50%)",
                    // backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "5px",
                    // "&:hover": {
                    //   backgroundColor: "#f5f5f5",
                    // },
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
            <ErrorMessage name="aadharBack" component="div" style={{ color: "red" }} />

            {/* Passport Size Photo */}
            <Typography sx={{ fontFamily: "-moz-initial", fontSize: "2.5vh", color: "black" }}>
              Passport Size Photo
            </Typography>
            <Box sx={{ width: "40%", textAlign: "center", border: "1px solid gray" }}>
              <IconButton component="label">
                <AddPhotoAlternateIcon />
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    handleFileChange(event, (file) => setFieldValue("passportSizePhoto", file), setPreviewPassportSizePhoto)
                  }
                />
              </IconButton>
            </Box>
            {previewPassportSizePhoto && (
              <Box sx={{ mt: 2, width: "40%", textAlign: "center", position: "relative" }}>
                <img src={previewPassportSizePhoto} alt="Passport Photo Preview" style={{ maxWidth: "100%", height: "auto" }} />
                <IconButton
                  onClick={() => handleDelete(() => setFieldValue("passportSizePhoto", ""), setPreviewPassportSizePhoto)}
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    transform: "translate(50%, -50%)",
                    // backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "5px",
                    // "&:hover": {
                    //   backgroundColor: "#f5f5f5",
                    // },
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
            <ErrorMessage name="passportSizePhoto" component="div" style={{ color: "red" }} />

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

export default Step4Form;
