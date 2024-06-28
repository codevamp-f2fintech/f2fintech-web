import React, { useState } from "react";
import axios from "axios";
import { Button, Container, Typography, Box, Input, Paper, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: 500,
}));

const StyledInput = styled(Input)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

function ImportLoanProvider() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage("");
    setError("");
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8080/api/v1/import-loan-providers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
      setError("");
    } catch (error) {
      setMessage("");
      setError("Error uploading file.");
    }
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Import Loan Providers
      </Typography>
      <StyledPaper elevation={3}>
        <Typography variant="h6" gutterBottom>
          Upload your file
        </Typography>
        <StyledInput type="file" onChange={handleFileChange} fullWidth />
        <Box mt={2} mb={2} width="100%">
          <Button variant="contained" color="primary" onClick={handleFileUpload} fullWidth>
            Upload
          </Button>
        </Box>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
      </StyledPaper>
    </StyledContainer>
  );
}

export default ImportLoanProvider;
