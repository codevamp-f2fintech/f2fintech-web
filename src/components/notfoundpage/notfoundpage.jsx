import React from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background:
          "linear-gradient(to right, rgba(0, 235, 219, 0.5), rgba(189, 113, 236, 0.5))",
        borderRadius: "0% 100% 0% 100% / 0% 100% 0% 100%",
        textAlign: 'center',
        color: '#000000',
      }}
    >
      <Grid container spacing={2} sx={{ maxWidth: '80%', textAlign: 'center' }}>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            color="#000000"
            sx={{
              marginBottom: '5vh',
              fontSize: '12vh',
              fontWeight: 'bold'
            }}
          >
            404
          </Typography>
          <Typography
            variant="h3"
            color="primary"
            sx={{
              marginBottom: '0.8vh',
              fontSize: '5vh',
              fontWeight: 'bold'
            }}
          >
            OOPS!
          </Typography>
          <Typography
            variant="h5"
            sx={{
              marginBottom: '0.8vh',
              fontSize: '2.4vh',
              fontWeight: '500',
            }}
          >
            Page Not Found!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: '1.6vh',
              fontSize: '3vh',
            }}
          >
            <Typography component="span" sx={{ fontWeight: 'bold', fontSize: '3vh' }}>
              We can't find the page you're looking for...
            </Typography>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToHome}
            sx={{
              fontSize: '3vh',
              fontWeight: 'normal',
              borderRadius: '5vh',
              width: '30vh',
              height: '6vh',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              }
            }}
          >
            Go Back
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotFoundPage;
