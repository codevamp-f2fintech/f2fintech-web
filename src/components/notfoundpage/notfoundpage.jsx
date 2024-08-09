import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import image from '/birdz.png';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        background: 'white',
        padding: '0 10vw',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to right, rgba(0, 235, 219, 0.5), rgba(189, 113, 236, 0.5))',
          borderRadius: '50% 50% 50% 50%',
          zIndex: 1, 
          pointerEvents: 'none', 
        }}
      />
      <Box
        sx={{
          textAlign: 'center',
          maxWidth: '50%',
          mt: 15, 
          zIndex: 2, 
        }}
      >
        <Typography
          variant="h3"
          color="rgba(6,55,158,1)"
          sx={{
            mb: 2,
            fontSize: '8vh',
            fontWeight: 'bold'
          }}
        >
          OOPS!
        </Typography>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontSize: '4vh',
            fontWeight: '500',
          }}
        >
          Page Not Found!
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 3,
            fontSize: '2.5vh',
            fontWeight: 'bold',
          }}
        >
          We can't find the page you're looking for...
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBackToHome}
        sx={{
          fontSize: '2.5vh',
          fontWeight: 'normal',
          borderRadius: '5vh',
          left: '17%',
          width: '27vh',
          height: '8vh',
          transition: 'transform 0.3s ease-in-out',
          mb: 25, 
          alignSelf: '', 
          zIndex: 2,
          '&:hover': {
            transform: 'scale(1.1)',
          }
        }}
      >
        Back to home 
      </Button>
      <Box
        sx={{
          position: 'absolute',
          ml: 80,
          mb: 13,
          bottom: '10%',
          width: '40%',
          height: 'auto',
          zIndex: 2,
          background: 'linear-gradient(to right, rgba(0, 235, 219, 0), rgba(189, 113, 236, 0))',
          padding: '10px', 
          borderRadius: '20px', // Adjusted border radius for better blending
        }}
      >
        <img src={image} alt="Not Found" style={{ width: '100%', height: 'auto', borderRadius: '50%' }} />
      </Box>
      <Typography
        variant="h1"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          fontSize: '20vh',
          color: '#000066',
          zIndex: 2
        }}
      >
        404
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
