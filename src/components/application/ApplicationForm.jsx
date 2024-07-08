import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Step1Form from "./Step1Form";
import Step2Form from "./Step2Form";
import Step3Form from "./Step3Form";
import Step4Form from "./Step4Form";
import Step5Form from "./Step5Form";
// import Step6Form from "./Step6Form";

const steps_form = [
  {
    label: "Basic Details",
    icon: "https://open-frontend-bucket.s3.amazonaws.com/open-capital/onboarding/register/icons/basic-details.svg",
  },
  {
    label: "PAN veriﬁcation",
    icon: "https://open-frontend-bucket.s3.amazonaws.com/open-capital/onboarding/register/icons/pan.svg",
  },
  {
    label: "Statement upload",
    icon: "https://open-frontend-bucket.s3.amazonaws.com/open-capital/onboarding/register/icons/statement.svg",
  },
  {
    label: "Proﬁle details and proof",
    icon: "https://open-frontend-bucket.s3.amazonaws.com/open-capital/onboarding/register/icons/profile-details.svg",
  },
  {
    label: "Business Details",
    icon: "https://open-frontend-bucket.s3.amazonaws.com/open-capital/onboarding/register/icons/business-details.svg",
  },
  // {
  //   label: "Disbursal",
  //   icon: "https://open-frontend-bucket.s3.amazonaws.com/open-capital/onboarding/register/icons/disbursal.svg",
  // },
];

const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];

const initialValues = [
  { field1: "" },
  { field2: "" },
  { field3: "" },
  { field4: "" },
  { field5: "" },
  // { field6: "" },
];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState(initialValues);
  const [loanType, setLoanType] = useState("");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setFormValues(initialValues);
  };

  const handleChange = (step) => (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[step][name] = value;
      return newValues;
    });
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    console.log(values);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1Form setLoanType={setLoanType} handleNext={handleNext} />;
      case 1:
        return <Step2Form handleNext={handleNext} />;
      case 2:
        return (
          <Step3Form initialValues={formValues[step]} onSubmit={handleSubmit} />
        );
      case 3:
        return (
          <Step4Form initialValues={formValues[step]} onSubmit={handleSubmit} />
        );
      case 4:
        return (
          loanType === "business" && (
            <Step5Form
              initialValues={formValues[step]}
              onSubmit={handleSubmit}
            />
          )
        );
      // case 5:
      //   return (
      //     <Step6Form initialValues={formValues[step]} onSubmit={handleSubmit} />
      //   );
      default:
        return "Unknown step";
    }
  };

  return (
    <Container sx={{ display: "flex", width: "100%", marginBottom: "15px" }}>
      <Box sx={{ display: "flex", width: "100%", marginBottom: "15px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "50%",
            overflowY: "auto", // Enable vertical scrolling
            maxHeight: "260vh", // Adjust height as needed
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box>
              {activeStep === steps.length ? (
                <Box>
                  <Typography>All steps completed - you're finished</Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              ) : (
                <Box>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ ml: 10 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {activeStep < steps.length - 1 ? (
                      <Button onClick={handleNext} sx={{ mr: 10 }}>
                        Next
                      </Button>
                    ) : (
                      <Button type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
            <Stepper activeStep={activeStep} sx={{ margin: "20px 20px" }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            backgroundColor: "#f5f5f5",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            position: "sticky", // Make the right box sticky
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h4" align="center" sx={{ marginBottom: "20px" }}>
            Steps ahead
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ marginBottom: "20px" }}
          >
            In order to receive the loan amount, you will need to successfully
            complete these steps.
          </Typography>
          {steps_form.map((step, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "white",
                display: "flex",
                width: "20vw",
                alignItems: "center",
                borderRadius: "10px",
                padding: "10px",
                marginBottom: "20px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <Box
                component="img"
                src={step.icon}
                alt={`${step.label} icon`}
                sx={{ width: "40px", height: "40px", marginRight: "10px" }}
              />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {step.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default MultiStepForm;
