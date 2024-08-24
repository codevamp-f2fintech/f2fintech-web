import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  Typography,
  Button,
  Avatar,
  Container,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import API from "../../apis"; // Import the centralized API object
import Toast from "../toast/Toast";
import { Utility } from "../utility";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  contact: Yup.string().required("Contact is required"),
});

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState("/default-avatar.png");
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const toastInfo = useSelector((state) => state.toastInfo);
  const { getLocalStorage, toastAndNavigate } = Utility();
  const customerId = getLocalStorage("customerInfo")?.id;
  const isMobile = useMediaQuery("(max-width:900px)");
  const isTab = useMediaQuery("(max-width:1200px)");

  useEffect(() => {
    setLoading(true);

    API.CustomerAPI.getCustomerProfile(customerId)
      .then(({ data }) => {
        console.log("Customer Profile API Response:", data);
        if (data.status === "Success") {
          setUserData(data.data.customer);

          // Fetch the profile picture URL using API.DocumentAPI
          API.DocumentAPI.getCustomerDocuments(customerId)
            .then(({ data }) => {
              console.log("Customer Documents API Response:", data);

              // Double-check that documents is an array and log more details if it's not
              if (data && data.data && Array.isArray(data.data.documents)) {
                const documentsArray = data.data.documents;

                console.log("Documents Array:", documentsArray);

                // Filter for the document with type "photo"
                const profileDoc = documentsArray.find(
                  (doc) => doc.type === "photo"
                );

                if (profileDoc && profileDoc.document_url) {
                  console.log("Profile Image URL found:", profileDoc.document_url);
                  setProfileImageUrl(profileDoc.document_url); // Set the image URL from the document
                } else {
                  console.log("No profile document found or document URL is missing, using default.");
                  setProfileImageUrl("/default-avatar.png");
                }
              } else {
                console.error("Documents array is missing or not an array, using default.");
                console.log("Received 'documents' value:", data.data.documents);
                setProfileImageUrl("/default-avatar.png");
              }
            })
            .catch((err) => {
              console.error("Error fetching customer documents, using default avatar:", err);
              setProfileImageUrl("/default-avatar.png");
            });
        } else {
          console.error("Failed to fetch customer profile, status:", data.status);
          setProfileImageUrl("/default-avatar.png");
        }
      })
      .catch((err) => {
        console.error("Error fetching customer profile, using default avatar:", err);
        setProfileImageUrl("/default-avatar.png");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [editMode]);

  const handleSubmit = (formData, resetForm) => {
    setLoading(true);
    API.CustomerAPI.updateCustomerProfile({
      ...formData,
      customerId,
    })
      .then((res) => {
        if (res.status === "Success") {
          setEditMode(false);
          resetForm();
          toastAndNavigate(
            dispatch,
            true,
            "success",
            "Updated Successfully"
          );
        } else {
          console.error("Failed to update profile, status:", res.status);
        }
      })
      .catch((err) => {
        console.error("Error updating customer profile:", err);
        setOpen(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <Container
        maxWidth={false}
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 !important",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        background:
          "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(6,55,158,1) 100%)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card
        sx={{
          height: "64vh",
          width: "80vw",
          maxWidth: "100%",
          textAlign: "center",
          mx: "auto",
          mt: 5,
          backgroundImage: "url('profilenawa.avif')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          borderRadius: "40px",
          backgroundColor: "#b3ffe0",
        }}
      >
        <Box
          sx={{
            display: isMobile ? "block" : isTab ? "block" : "flex",
            justifyContent: isMobile ? "normal" : isTab ? "normal" : "flex-end",
            marginRight: isMobile ? "0vh" : "7vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: isMobile ? "0vh" : "0vh",
            }}
          >
            <Formik
              initialValues={{
                name: userData?.name || "",
                email: userData?.email || "",
                gender: userData?.gender || "",
                contact: userData?.contact || "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                handleSubmit(values, resetForm);
              }}
            >
              {({ values, handleChange, errors, touched }) => (
                <Form>
                  {editMode ? (
                    <>
                      {/* Form fields for editing profile */}
                    </>
                  ) : (
                    <>
                      <Box>
                        <Avatar
                          sx={{
                            width: isMobile ? "15vh" : isTab ? "20vh" : "30vh",
                            height: isMobile ? "15vh" : isTab ? "20vh" : "30vh",
                            fontSize: isMobile ? "10vw" : isTab ? "7vw" : "5vw",
                            marginLeft: isMobile
                              ? "-7vh"
                              : isTab
                              ? "24vh"
                              : "-6vh",
                            position: "absolute",
                            marginTop: "-7vh",
                            boxShadow:
                              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                            ":hover": {
                              transform: "scale(1.1)",
                              transition: "all 300ms ease-in-out",
                            },
                          }}
                          alt={values.name}
                          src={profileImageUrl || "/default-avatar.png"} // Display the fetched image URL or a default avatar
                        />
                      </Box>
                      <Container
                        sx={{
                          width: isMobile ? "27vh" : isTab ? "60vh" : "100vh",
                          height: isMobile ? "45vh" : isTab ? "50vh" : "40vh",
                        }}
                      >
                        <Box
                          sx={{
                            width: isMobile
                              ? "40vh"
                              : isTab
                              ? "100vh"
                              : "100vh",
                            height: isMobile ? "30vh" : isTab ? "40vh" : "40vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2,
                            marginTop: isMobile
                              ? "32vh"
                              : isTab
                              ? "30vh"
                              : "18vh",
                            marginLeft: isMobile
                              ? "-9vh"
                              : isTab
                              ? "7vh"
                              : "30vh",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily: "monospace",
                              fontSize: isMobile
                                ? "5vw"
                                : isTab
                                ? "4vw"
                                : "2vw",
                              fontWeight: "500",
                              marginRight: {
                                xs: "0vh", // Adjust margin for extra small screens
                                md: "50vh", // Adjust margin for medium screens and above
                              },
                            }}
                          >
                            {userData?.name}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "monospace",
                              fontSize: isMobile
                                ? "4vw"
                                : isTab
                                ? "4vw"
                                : "1.5vw",
                              fontWeight: "400",
                              marginRight: {
                                xs: "0vh", // Adjust margin for extra small screens
                                md: "50vh", // Adjust margin for medium screens and above
                              },
                            }}
                          >
                            {userData?.email}
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: "monospace",
                              fontSize: isMobile
                                ? "4vw"
                                : isTab
                                ? "4vw"
                                : "1.5vw",
                              fontWeight: "400",
                              marginRight: {
                                xs: "0vh", // Adjust margin for extra small screens
                                md: "50vh", // Adjust margin for medium screens and above
                              },
                            }}
                          >
                            {userData?.contact}
                          </Typography>
                          <Button
                            variant="contained"
                            sx={{
                              width: isMobile
                                ? "5rem"
                                : isTab
                                ? "7rem"
                                : "8rem",
                              fontSize: isMobile ? "2vw" : isTab ? "2vw" : "",
                              borderRadius: "30px",
                              color: "black",
                              backgroundColor: "white",
                              marginRight: isMobile
                                ? "0vh"
                                : isTab
                                ? "50vh"
                                : "",
                              "&:hover": {
                                backgroundColor: "blue",
                                color: "white",
                              },
                              mt: 2,
                            }}
                            onClick={() => setEditMode(true)}
                          >
                            Edit
                          </Button>
                        </Box>
                      </Container>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Card>
      <Toast
        open={open}
        message="Profile updated successfully!"
        severity="success"
      />
    </Container>
  );
}
