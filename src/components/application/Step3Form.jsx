import React from "react";
import { Formik, Form } from "formik";
import { Box, Typography, Container, TextField, Button } from "@mui/material";
import * as Yup from "yup";

const validationSchema = Yup.object({
  field1: Yup.string().required("Required"),
});

const Step3Form = ({ handleNext }) => (
  <Formik
    validationSchema={validationSchema}
    onSubmit={handleNext}
  >
    {({ isSubmitting }) => (
      <Form>
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
              Step 3/6
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="file"
                id="file-input"
                style={{ display: "none" }}
                aria-label="Select file"
              />
              <Button
                variant="contained"
                component="span"
                sx={{
                  marginTop: "30px",
                  width: "200px",
                  color: "white",
                  backgroundColor: "gray",
                  border: "ButtonShadow",
                  "&:hover": {
                    backgroundColor: "silver",
                  },
                }}
                onClick={() => document.getElementById("file-input").click()}
              >
                Select file
              </Button>
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
                Upload
              </Button>
            </Box>
          </Box>
        </Container>
      </Form>
    )}
  </Formik>
);

export default Step3Form;
