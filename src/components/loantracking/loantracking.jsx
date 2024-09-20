import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Paper,
  Container,
  Grid,
  StepConnector,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PublishTwoToneIcon from "@mui/icons-material/PublishTwoTone";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PercentIcon from "@mui/icons-material/Percent";
import MoneyIcon from "@mui/icons-material/Money";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HighlightIcon from "@mui/icons-material/Highlight";
import InfoIcon from "@mui/icons-material/Info";

import API from "../../apis";
import stepsData from "../stepsData";
import { Utility } from "../utility";

const initialSteps = [
  { label: "Submitted", icon: <PublishTwoToneIcon /> },
  { label: "Under review", icon: <RemoveRedEyeIcon /> },
  { label: "Hold", icon: <PauseCircleFilledIcon /> },
  { label: "Rejected", icon: <CancelIcon /> },
  { label: "Approved", icon: <DoneIcon /> },
  { label: "Disbursed", icon: <AttachMoneyIcon /> },
];

const colorMap = {
  Submitted: "darkgreen",
  "Under review": "blue",
  Hold: "orange",
  Rejected: "red",
  Approved: "green",
  Disbursed: "purple",
};

const statusImageMap = {
  Submitted: "https://online.sbimf.com/assets/images/mandate-success-icon.svg",

  "Under review":
    "https://st3.depositphotos.com/2274151/36576/v/450/depositphotos_365760986-stock-illustration-review-stamp-review-vintage-blue.jpg",
  Hold: "https://previews.123rf.com/images/argus456/argus4561606/argus456160632805/58192401-on-hold-3d-rendering-rough-street-sign-collection.jpg",
  Rejected: "https://cdn-icons-png.flaticon.com/512/3712/3712858.png",
  Approved:
    "https://img.freepik.com/free-vector/approved-sign-with-shield-gradient_78370-1025.jpg",
  Disbursed: "https://anytimeloan.in/assets/images/lender.gif",
};

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& .MuiStepConnector-line": {
      borderColor: theme.palette.primary.main,
      borderWidth: 8,
    },
  },
  completed: {
    "& .MuiStepConnector-line": {
      borderColor: theme.palette.primary.main,
      borderWidth: 8,
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderWidth: 8,
  },
}));

const Loan = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState(initialSteps);
  const [loanData, setLoanData] = useState(null);

  const { getLocalStorage } = Utility();
  const customerId = getLocalStorage("customerInfo")?.id;

  useEffect(() => {
    const fetchLoanTracking = async () => {
      try {
        const { data: resp } = await API.CustomerApplicationAPI.getApplicationById(customerId);
        if (resp.status === "Success") {
          const { data: response } = await API.LoanTrackingAPI.getLoanTrackingById(resp.data.id);
          console.log(response.data, 'loan trackking response')

          if (response.status === "Success") {
            const { status } = response.data;
            const normalizedStatus = status.replace(/_/g, " ").toLowerCase();
            const statusIndex = initialSteps.findIndex(
              (step) => step.label.toLowerCase() === normalizedStatus
            );
            console.log(statusIndex, 'statusindex')

            if (statusIndex !== -1) {
              setActiveStep(statusIndex);
            } else {
              console.error("Invalid status:", status);
            }
            // setLoanData(response.data);
          } else {
            console.error("Invalid data format:", response);
          }
        } else {
          console.error("Failed to fetch application:", resp);
        }
      } catch (error) {
        console.error("Error fetching loan tracking data:", error);
      }
    };

    fetchLoanTracking();
  }, [customerId]);


  const getStepColor = (index) => {
    if (index <= activeStep) {
      const status = steps[index].label;
      return colorMap[status] || "white";
    } else {
      return "gray";
    }
  };

  const currentStepData = stepsData[activeStep];
  const currentStatusImage = statusImageMap[steps[activeStep].label];

  return (
    <Container
      maxWidth="false"
      sx={{
        display: "flex",
        padding: "0px !important",
        maxWidth: "100% !important",
        height: "120vh",
        marginTop: "10px !important",
        background:
          "linear-gradient(10deg, rgba(34,193,195,1) , rgba(6,5,158,1) )",
        borderRadius: "0px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "110vh",
          padding: "30px",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            marginBottom: 4,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              textAlign: "center",
              marginTop: "40px",
            }}
          >
            Loan Tracker
          </Typography>
        </Box>

        <Box
          sx={{
            borderRadius: 5,
            boxShadow: 3,
            padding: 3,
            width: "90%",
          }}
        >
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{ width: "100%" }}
            connector={<CustomConnector />}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={() => (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 40,
                        height: 40,
                        marginTop: -1,
                        borderRadius: "100%",
                        border: `1px solid ${index}`,
                        backgroundColor: getStepColor(index),
                        color: "white",
                        marginBottom: 1,
                        transition:
                          "background-color 0.3s ease, color 0.3s ease",
                      }}
                    >
                      {React.cloneElement(step.icon, {
                        style: { color: "white", fontSize: "1.5rem" },
                      })}
                    </Box>
                  )}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: "Verdana, sans-serif",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                    color="#fff"
                  >{`STEP ${index + 1}`}</Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Verdana, sans-serif",
                      fontWeight: "normal",
                      fontSize: "1rem",
                    }}
                    color="#fff"
                  >
                    {step.label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {currentStepData ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              padding: 3,
              width: "90%",
              marginTop: 6,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                background: "white",
                borderRadius: "20px",
                width: "100%",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <Box
                    sx={{
                      width: "100%",
                      padding: "5px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#2c3ce3",
                      height: "30vh",
                    }}
                  >
                    <img
                      alt={currentStepData.name}
                      src={currentStepData.logo}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "10px",
                        transition: "transform 0.3s ease",
                      }}
                      className="image-hover"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "bold",
                      color: "#1e3a8a",
                      mb: 2,
                      textTransform: "uppercase",
                      marginLeft: "25px",
                      fontSize: "20px",
                    }}
                  >
                    {currentStepData.name}
                    <hr
                      style={{
                        backgroundColor: "grey",
                        height: "1px",
                        border: "none",
                        opacity: 0.3,
                        margin: "5px 0",
                      }}
                    />
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#1e3a8a",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "25px",
                      fontSize: "15px",
                    }}
                  >
                    <PercentIcon sx={{ marginRight: 1 }} />
                    <strong style={{ marginRight: 8 }}>ROI:</strong>
                    <Box
                      component="span"
                      sx={{ color: "#009688", fontWeight: "bold" }}
                    >
                      {currentStepData.ROI}
                    </Box>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#1e3a8a",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "25px",
                    }}
                  >
                    <MoneyIcon sx={{ marginRight: 1 }} />
                    <strong style={{ marginRight: 8 }}>Fees:</strong>
                    <Box
                      component="span"
                      sx={{ color: "#009688", fontWeight: "bold" }}
                    >
                      {currentStepData.fees}
                    </Box>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#1e3a8a",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "25px",
                    }}
                  >
                    <AccessTimeIcon sx={{ marginRight: 1 }} />
                    <strong style={{ marginRight: 8 }}>Tenure:</strong>
                    <Box
                      component="span"
                      sx={{ color: "#009688", fontWeight: "bold" }}
                    >
                      {currentStepData.tenure}
                    </Box>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#1e3a8a",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "25px",
                    }}
                  >
                    <HighlightIcon sx={{ marginRight: 1 }} />
                    <strong style={{ marginRight: 8 }}>Highlight:</strong>
                    <Box
                      component="span"
                      sx={{ color: "#009688", fontWeight: "bold" }}
                    >
                      {currentStepData.highlight}
                    </Box>
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#1e3a8a",
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <InfoIcon sx={{ marginRight: 1 }} />
                    <Box
                      component="span"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "20px",
                        borderRadius: "10px",
                        padding: "5px",
                        color: getStepColor(activeStep),
                        backgroundColor: "#fff",
                      }}
                    >
                      {currentStepData.additionalInfo}
                    </Box>
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      width: "40%",
                      padding: "5px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#2c3ce3",
                      height: "40vh",
                      marginLeft: "auto",
                      marginRight: "100px",
                    }}
                  >
                    <img
                      alt={steps[activeStep].label}
                      src={currentStatusImage}
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "10px",
                        transition: "transform 0.3s ease",
                        margin: "0 auto",
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        ) : (
          <Typography variant="h6" sx={{ color: "#fff", marginTop: 4 }}>
            Loading...
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Loan;
