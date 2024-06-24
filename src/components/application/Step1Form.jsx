import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  TextField,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Button,
  FilledInput,
  Container,
} from "@mui/material";
import * as Yup from "yup";

const validationSchema = Yup.object({
  field1: Yup.string().required("Required"),
});

const Step1Form = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
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
                fontFamily: "bold 10px",
                fontSize: "4vh",
                fontWeight: "300vh",
              }}
            >
              Basic Details
            </Typography>
            <Typography
              sx={{
                fontFamily: "-moz-initial",
                fontSize: "2.5vh",
                color: "gray",
              }}
            >
              Step 1/6
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
            <TextField
              // as={TextField}
              disableUnderline={true}
              variant="filled"
              name="field1"
              label="Number"
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
            <TextField
              // as={TextField}
              disableUnderline={true}
              variant="filled"
              name="field1"
              label="E-mail"
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
            <TextField
              // as={TextField}
              disableUnderline={true}
              variant="filled"
              name="field1"
              label="Pincode1"
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
            <TextField
              // as={TextField}
              disableUnderline={true}
              variant="filled"
              name="field1"
              label="PAN*"
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
            <TextField
              // as={TextField}
              disableUnderline={true}
              variant="filled"
              name="field1"
              label="GST"
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
            <TextField
              // as={TextField}
              disableUnderline={true}
              variant="filled"
              name="field1"
              label="Company Name"
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
            <TextField
              // as={TextField}
              disableUnderline={true}
              variant="filled"
              name="field1"
              label="Entity Type"
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
            <TextField
              // as={TextField}
              disableUnderline={true}
              variant="filled"
              name="field1"
              label="Bank Account Type"
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
            <TextField
              // as={TextField}
              disableUnderline={true}
              variant="filled"
              name="field1"
              label="Industry Type"
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
            <TextField
              // as={TextField}
              disableUnderline={true}
              variant="filled"
              name="field1"
              label="Sub Industry Type"
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
            <TextField
              // as={TextField}
              disableUnderline={true}
              variant="filled"
              name="field1"
              label="Refrrel id (Optional)"
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

            <FormGroup sx={{ display: "flex", ml: 5, mr: 8 }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={
                  <Typography sx={{ fontSize: "0.875rem", color: "gray" }}>
                    {" "}
                    I agree to opt for the product and service of F2fintech. By
                    opting for F2fintech, I agree to have read, understood and
                    explictly consent to the T&C, Privacy Policy and F2fintech
                    Credit Terms.
                  </Typography>
                }
              />
            </FormGroup>
            <FormGroup sx={{ display: "flex", ml: 5, mr: 8 }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={
                  <Typography sx={{ fontSize: "0.875rem", color: "gray" }}>
                    {" "}
                    I further consent to recieve the loan and product updates of
                    f2fintech on whatsapp and allow f2fintech and/or their
                    authorised third party service providers to contact me for
                    maketing purposes via SMS, Telephone, Email or any other
                    means.
                  </Typography>
                }
              />
            </FormGroup>
          </Box>
        </Container>
      </Form>
    )}
  </Formik>
);

export default Step1Form;
