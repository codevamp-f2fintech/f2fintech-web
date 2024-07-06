import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Box, Typography, Paper, CssBaseline, Container, Grid, Avatar, AppBar, Toolbar } from '@mui/material';

// Mock data for each step
const stepsData = [
  {
    id: 1,
    name: 'HDFC',
    logo: '/HDFC.png', // Replace with actual logo URL
    ROI: '8.5%',
    fees: '₹1,000',
    tenure: '5 years',
    highlight: 'Low interest rate',
    additionalInfo: 'Amidst the bustling city, where the cacophony of traffic blends with the chatter of street vendors and the distant hum of construction, a solitary figure stands at the intersection, contemplating the next steps in the loan process.',
    description: 'Your loan application has been submitted successfully. Our team is now reviewing the details you have provided. You will receive an update soon regarding the next steps. Thank you for choosing our services.'
  },
  {
    id: 2,
    name: 'HDFC',
    logo: '/HDFC.png', // Replace with actual logo URL
    ROI: '8.5%',
    fees: '₹1,000',
    tenure: '5 years',
    highlight: 'Low interest rate',
    additionalInfo: 'Amidst the bustling city, where the cacophony of traffic blends with the chatter of street vendors and the distant hum of construction, a solitary figure stands at the intersection, contemplating the next steps in the loan process.',
    description: 'Your loan application is currently under review by our financial experts. We are thoroughly evaluating the information provided to ensure all criteria are met. This process might take a few days. We appreciate your patience.'
  },
  {
    id: 3,
    name: 'HDFC',
    logo: '/HDFC.png', // Replace with actual logo URL
    ROI: '8.5%',
    fees: '₹1,000',
    tenure: '5 years',
    highlight: 'Low interest rate',
    additionalInfo: 'Amidst the bustling city, where the cacophony of traffic blends with the chatter of street vendors and the distant hum of construction, a solitary figure stands at the intersection, contemplating the next steps in the loan process.',
    description: 'Your loan application is on hold. There may be additional information or documentation required to proceed. Please check your email or contact our support team for further instructions on how to resolve this hold.'
  },
  {
    id: 4,
    name: 'HDFC',
    logo: '/HDFC.png', // Replace with actual logo URL
    ROI: '8.5%',
    fees: '₹1,000',
    tenure: '5 years',
    highlight: 'Low interest rate',
    additionalInfo: 'Amidst the bustling city, where the cacophony of traffic blends with the chatter of street vendors and the distant hum of construction, a solitary figure stands at the intersection, contemplating the next steps in the loan process.',
    description: 'Unfortunately, your loan application has been rejected. This decision could be due to several factors, such as credit score, income level, or incomplete documentation. Please reach out to our support team for detailed feedback and possible next steps.'
  },
  {
    id: 5,
    name: 'HDFC',
    logo: '/HDFC.png', // Replace with actual logo URL
    ROI: '8.5%',
    fees: '₹1,000',
    tenure: '5 years',
    highlight: 'Low interest rate',
    additionalInfo: 'Amidst the bustling city, where the cacophony of traffic blends with the chatter of street vendors and the distant hum of construction, a solitary figure stands at the intersection, contemplating the next steps in the loan process.',
    description: 'Congratulations! Your loan application has been approved. You will receive the final loan agreement documents shortly. Please review and sign the documents to proceed with the loan disbursement process.'
  },
  {
    id: 6,
    name: 'HDFC',
    logo: '/HDFC.png', // Replace with actual logo URL
    ROI: '8.5%',
    fees: '₹1,000',
    tenure: '5 years',
    highlight: 'Low interest rate',
    additionalInfo: 'Amidst the bustling city, where the cacophony of traffic blends with the chatter of street vendors and the distant hum of construction, a solitary figure stands at the intersection, contemplating the next steps in the loan process.',
    description: 'Your loan amount has been disbursed to your account. You can now access the funds. Thank you for trusting us with your financial needs. For any queries or support, feel free to contact our customer service team.'
  }
];

const steps = [
  'Loan Application Submitted',
  'Under Review',
  'Hold',
  'Reject',
  'Approved',
  'Disbursed'
];

const LoanTrackingPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Loan Tracking System</Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: '64px' }} /> {/* Space between navbar and stepper */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} onClick={() => handleStepClick(index)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <Avatar alt={stepsData[activeStep].name} src={stepsData[activeStep].logo} sx={{ width: 56, height: 56 }} />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Typography variant="h6">{stepsData[activeStep].name}</Typography>
            <Typography variant="body1"><strong>ROI:</strong> {stepsData[activeStep].ROI}</Typography>
            <Typography variant="body1"><strong>Fees:</strong> {stepsData[activeStep].fees}</Typography>
            <Typography variant="body1"><strong>Tenure:</strong> {stepsData[activeStep].tenure}</Typography>
            <Typography variant="body1"><strong>Highlight:</strong> {stepsData[activeStep].highlight}</Typography>
            <Typography variant="body2" sx={{ marginTop: 1 }}>{stepsData[activeStep].additionalInfo}</Typography>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Step Description</Typography>
          <Typography>{steps[activeStep]}</Typography>
          <Typography>{stepsData[activeStep].description}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

function App() {
  return (
    <div>
      <CssBaseline />
      <Container>
        <LoanTrackingPage />
      </Container>
    </div>
  );
}

export default App;
