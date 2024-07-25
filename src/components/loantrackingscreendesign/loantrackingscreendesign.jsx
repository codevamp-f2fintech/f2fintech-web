import React, { useState, useEffect } from 'react';
import {
  Stepper, Step, StepLabel, Box, Typography, Paper, CssBaseline, Container,
  Grid, Divider, StepConnector
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import PublishTwoToneIcon from '@mui/icons-material/PublishTwoTone';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { darken } from '@mui/system';
import { LoanTrackingAPI } from '../../apis/LoanTrackingAPI'; // Update the path as needed
import stepsData from '../stepsData';

const initialSteps = [
  { label: 'submitted', icon: <PublishTwoToneIcon />, color: 'rgba(0, 235, 219, 0.5)' },
  { label: 'under_review', icon: <RemoveRedEyeIcon />, color: 'rgba(0, 235, 219, 0.5)' },
  { label: 'hold', icon: <PauseCircleFilledIcon />, color: 'rgba(0, 235, 219, 0.5)' },
  { label: 'rejected', icon: <CancelIcon />, color: 'rgba(0, 235, 219, 0.5)' },
  { label: 'approved', icon: <DoneIcon />, color: 'rgba(0, 235, 219, 0.5)' },
  { label: 'disbursed', icon: <AttachMoneyIcon />, color: 'rgba(0, 235, 219, 0.5)' },
];

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
      borderWidth: 8,
    },
  },
  completed: {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
      borderWidth: 8,
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderWidth: 8,
  },
}));

const Loan = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [steps, setSteps] = useState(initialSteps);
  const [loanData, setLoanData] = useState(null);

  useEffect(() => {
    const fetchLoanTracking = async () => {
      try {
        const response = await LoanTrackingAPI.getLoanTracking();
        const { data } = response;
        console.log('Fetched loan tracking data:', data);

        if (data?.data?.rows?.length > 0) {
          const { status } = data.data.rows[0];
          const statusIndex = initialSteps.findIndex(step => step.label === status);

          if (statusIndex !== -1) {
            setActiveStep(statusIndex);
            const updatedSteps = initialSteps.map((step, index) => 
              index === statusIndex ? { ...step, color: 'rgba(189, 113, 236, 0.5)' } : step
            );
            setSteps(updatedSteps);
          } else {
            console.error('Invalid status:', status);
          }
          setLoanData(data.data.rows[0]);
        } else {
          console.error('Invalid data format:', data);
        }
      } catch (error) {
        console.error('Error fetching loan tracking data:', error);
      }
    };

    fetchLoanTracking();
  }, []);

  const getBackgroundColor = (color) => darken(color, 0.6);

  const currentStepData = stepsData[activeStep];

  return (
    <Container
      maxWidth="false"
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        padding: "0",
        margin: "0",
        background: 'white',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '25%',
          backgroundColor: 'background.default',
          position: 'relative',
        }}
      >
        <Box sx={{ 
          width: '80%', 
          background: 'white', 
          padding: 3, 
          borderRadius: '0px 0px', 
          boxShadow: '0px 0px 10px rgba(10, 212, 54, 0.1)',
          height: '90vh',
        }}>
          <Typography variant="h2" sx={{ mb: 2, color: 'blue', textAlign: 'center', fontWeight: 'bold' }}>Welcome to Loan Tracker</Typography>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4553c2', mb: 2, textAlign: 'center' }}>All Steps</Typography>
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 40,
                    height: 36,
                    borderRadius: '100%',
                    border: '1px solid #9999ff',
                    backgroundColor: activeStep === index ? getBackgroundColor(step.color) : step.color,
                    color: '#1b1bb6',
                    marginRight: 2,
                    transition: "background-color 0.3s ease, color 0.3s ease",
                    '&:hover': {
                      backgroundColor: '#4a90e2',
                      color: '#ffffff',
                    }
                  }}>
                    {step.icon}
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: 'calc(100% - 48px)' }}>
                    <Typography variant="body1" color="black">{step.label}</Typography>
                  </Box>
                </Box>
                {index < steps.length - 1 && <Divider sx={{ marginLeft: 7, marginTop: -1, marginBottom: 1 }} />}
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '100vh',
        background: "linear-gradient(to right, rgba(0, 235, 219, 0.5), rgba(189, 113, 236, 0.5))",
        padding: "30px",
        boxSizing: 'border-box',
      }}>
        <Box sx={{ backgroundColor: 'white', borderRadius: 10, boxShadow: 3, padding: 3, width: '90%' }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item></Grid>
          </Grid>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ width: '100%' }} connector={<CustomConnector />}>
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={() => (
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 50,
                      height: 50,
                      marginTop: -1,
                      borderRadius: '100%',
                      border: '1px solid #60b0c0',
                      backgroundColor: activeStep === index ? getBackgroundColor(step.color) : step.color,
                      color: 'grey',
                      marginBottom: 1,
                      transition: "background-color 0.3s ease, color 0.3s ease",
                      '&:hover': {
                        backgroundColor: 'white',
                        color: '#7575d8',
                      }
                    }}>
                      {step.icon}
                    </Box>
                  )}
                >
                  <Typography variant="caption" sx={{ fontFamily: 'Verdana, sans-serif', fontWeight: 'bold', fontSize: '1.2rem' }} color="#278d86">{`STEP ${index + 1}`}</Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'Verdana, sans-serif', fontWeight: 'normal', fontSize: '1rem' }} color="#278d86">{step.label}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        {currentStepData ? (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 3, width: '90%' }}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                background: 'white',
                borderRadius: '20px',
                width: '100%',
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <Box sx={{ width: '100%', padding: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#278d86' }}>
                    <img
                      alt={currentStepData.name}
                      src={currentStepData.logo}
                      style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px', transition: "transform 0.3s ease" }}
                      className="image-hover"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#278d86' }}>{currentStepData.name}</Typography>
                  <Typography variant="body1" sx={{ color: '#092a6e' }}><strong>ROI:</strong> {currentStepData.ROI}</Typography>
                  <Typography variant="body1" sx={{ color: '#092a6e' }}><strong>Fees:</strong> {currentStepData.fees}</Typography>
                  <Typography variant="body1" sx={{ color: '#092a6e' }}><strong>Tenure:</strong> {currentStepData.tenure}</Typography>
                  <Typography variant="body1" sx={{ color: '#092a6e' }}><strong>Highlight:</strong> {currentStepData.highlight}</Typography>
                  <Typography variant="body2" sx={{ marginTop: 1, fontStyle: 'bold', color: '#278d86' }}>{currentStepData.additionalInfo}</Typography>
                </Grid>
              </Grid>
              <Box sx={{ marginTop: 2, textAlign: 'left' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontStyle: 'bold', color: '#278d86' }}>Step Description</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'normal', fontStyle: 'normal', color: '#278d86' }}>{steps[activeStep].label}</Typography>
                <Typography variant="body1" sx={{ marginTop: 1, fontWeight: 'bold', color: '#278d86' }}>{currentStepData.description}</Typography>
              </Box>
            </Paper>
          </Box>
        ) : (
          <Typography variant="h6" color="error" sx={{ textAlign: 'center', marginTop: 2 }}>Step data not available</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Loan;
