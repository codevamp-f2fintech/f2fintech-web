import React, { useCallback, useState } from "react";
import { Formik, Form } from "formik";
import {
  Box,
  Typography,
  Container,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import * as Yup from "yup";
import API from "../../apis";
import { Utility } from "../utility";
// const validationSchema = Yup.object({
//   field1: Yup.string().required("Required"),
// });

const initialValues = {
  data: "",
};

const Step3Form = ({ handleNext }) => {
  const [filename, setFilename] = useState("");

  const { formatName, getLocalStorage } = Utility();

  const customerId = getLocalStorage("customerInfo")?.id;
  console.log("customer", customerId);

  const handleFormSubmit = useCallback((values) => {
    console.log("these are form values=>", values.data);
    const formattedName = formatName(values.data.name);
    // console.log("these formatted name=>",formattedName);

    API.DocumentAPI.uploadDocument({
      document: values.data,
      folder: `document/${formattedName}`,
    })
      .then((res) => {
        if (res.data.status === "Success") {
          API.DocumentAPI.createDocument({
            document_url: res.data.data,
            customer_id: customerId,
          })
            .then()
            .catch((err) => {
              console.log("Error in Creating image inside db", err);
            });
        } else {
          console.error("Upload failed");
        }
      })
      .catch((err) => {
        console.error("Error in upload:", err);
      });
  }, []);
  // const handleSubmit = async (values, { setSubmitting }) => {
  //   setSubmitting(true);
  //   // console.log("handleSubmit triggered");
  //   try {
  //     if (file) {
  //       // console.log("File selected:", file);

  //       const documentData = {
  //         name: file.name,
  //         size: file.size,
  //         type: file.type,
  //         ...values,
  //       };

  //       // console.log("Sending document data to createDocument API:", documentData);
  //       const createDocumentResponse = await API.DocumentAPI.createDocument(documentData);
  //       // console.log("Response from createDocument API:", createDocumentResponse);

  //       if (createDocumentResponse.status === "Success") {
  //         const documentId = createDocumentResponse.data.id;
  //         console.log("Document created with ID:", documentId);

  //         const formData = new FormData();
  //         formData.append("file", file);
  //         formData.append("document_id", documentId);

  //         console.log("Uploading file to S3 with formData:", formData);
  //         const uploadResponse = await API.DocumentAPI.uploadDocument(formData);
  //         console.log("Response from uploadDocument API:", uploadResponse);

  //         if (uploadResponse.status === 200) {
  //           alert("File uploaded successfully!");
  //           handleNext();
  //         } else {
  //           console.error("Failed to upload file to S3:", uploadResponse);
  //           throw new Error("Failed to upload file to S3");
  //         }
  //       } else {
  //         console.error("Failed to create document in the database:", createDocumentResponse);
  //         throw new Error("Failed to create document in the database");
  //       }
  //     } else {
  //       console.warn("No file selected for upload");
  //       alert("Please select a file to upload.");
  //     }
  //   } catch (error) {
  //     console.error("Error during file upload process:", error);
  //     alert("Failed to upload file. Please try again.");
  //   } finally {
  //     setSubmitting(false);
  //     console.log("handleSubmit finished");
  //   }
  // };

  return (
    <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
      {({
        dirty,
        values,
        isSubmitting,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              marginBottom: "15px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
                Statement Upload
              </Typography>
              <Typography
                sx={{
                  fontFamily: "-moz-initial",
                  fontSize: "2.5vh",
                  color: "gray",
                }}
              >
                Step 3/5
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                accept=".jpg, .gif, .png, .jpeg, .svg, .webp, application/pdf, .doc, .docx, .txt "
                name="file"
                label="Upload Document"
                size="small"
                // value={values.data || ""}
                onBlur={handleBlur}
                InputProps={{
                  startAdornment: (
                    <IconButton component="label" sx={{ width: "88%" }}>
                      <AddPhotoAlternateIcon />
                      <input
                        hidden
                        type="file"
                        name="file"
                        onChange={(event) => {
                          const newFile = Array.from(event.target.files); //iski vajah se name gayab hua
                          console.log("Selected file:", newFile[0]);
                          setFieldValue("data", newFile[0]);
                          setFilename(newFile[0]?.name || "");
                        }}
                      />
                    </IconButton>
                  ),
                }}
                sx={{ m: 1, outline: "none", width: "70%" }}
              />
              <Typography>Filename: {filename}</Typography>
              <Button
                color="primary"
                disabled={!dirty || isSubmitting}
                type="submit"
                variant="contained"
                sx={{
                  color: "white",
                  fontWeight: "500",
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                  mt: 2,
                }}
              >
                Upload
              </Button>
            </Box>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default Step3Form;
