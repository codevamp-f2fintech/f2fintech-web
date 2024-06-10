import React, { useState } from "react";

import { TextField, Button, Container, Box, Typography } from "@mui/material";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  console.log("issignup", isSignUp);

  return (
    <Container
      sx={{
        height: "100vh",
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 !important",
      }}
    >
      <Box
        sx={{
          backgroundImage: "url('login11.png')",
          width: "40%",
          height: "100vh",
          backgroundPosition: "top",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            zIndex: 1,
            ...(isSignUp && {
              visibility: "hidden",
              opacity: 0,
              transition: "visibility 0s linear 500ms,opacity 500ms",
            }),
            ...(!isSignUp && {
              visibility: "visible",
              opacity: 1,
              transition: "visibility 0s linear 0s,opacity 500ms",
            }),
          }}
        >
          <Typography
            sx={{
              fontSize: "2.3vw",
              fontweight: "400",
              fontFamily: "verdana",
              textAlign: "center",
              lineHeight: "1.75rem",
            }}
          >
            Sign In
          </Typography>
          <TextField
            id="phone-number"
            label="Phone Number"
            type="text"
            variant="filled"
            required
            inputProps={{
              maxLength: 10,
            }}
            InputProps={{
              disableUnderline: true,
              sx: { borderRadius: "15px", width: "25rem" },
            }}
          />
          <TextField
            id="password"
            label="Enter your password"
            type="password"
            variant="filled"
            required
            inputProps={{ minLength: 6, maxLength: 20 }}
            InputProps={{
              disableUnderline: true,
              sx: { borderRadius: "15px", width: "25rem" },
            }}
          />
          <Button
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            Lost Pasword? <span> Click here</span>
          </Button>
          <Button
            variant="contained"
            sx={{
              color: "white",
              fontWeight: "500",
              fontSize: "1rem",
              lineHeight: "1.5rem",
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundImage: "url('login0012.jpg')",
          width: "50%",
          borderRadius: "30% 0% 0% 30%",
          height: "100vh",
          backgroundPosition: "top",
          margin: "auto",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "50vh",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            zIndex: 1,
            ...(!isSignUp && {
              visibility: "hidden",
              opacity: 0,
              transition: "visibility 0s linear 500ms,opacity 500ms",
            }),
            ...(isSignUp && {
              visibility: "visible",
              opacity: 1,
              transition: "visibility 0s linear 0s,opacity 500ms",
            }),
          }}
        >
          <Typography
            sx={{
              fontSize: "2.3vw",
              fontweight: "400",
              fontFamily: "verdana",
              textAlign: "center",
              lineHeight: "1.75rem",
            }}
          >
            Create Account
          </Typography>
          <TextField
            id="phone-number"
            label="Enter your number"
            type="text"
            variant="filled"
            required
            inputProps={{
              maxLength: 10,
            }}
            InputProps={{
              disableUnderline: true,
              sx: { borderRadius: "15px", width: "25rem" },
            }}
          />
          <TextField
            id="password"
            label="Enter your password"
            type="password"
            variant="filled"
            required
            inputProps={{ minLength: 6, maxLength: 20 }}
            InputProps={{
              disableUnderline: true,
              sx: { borderRadius: "15px", width: "25rem" },
            }}
          />
          <Button
            variant="contained"
            sx={{
              color: "white",
              fontWeight: "500",
              fontSize: "1rem",
              lineHeight: "1.5rem",
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          height: "100vh",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(6,55,158,1) 100%)",
          color: "white",
          zIndex: 2,

          // transition: "all 1s ease",
          position: "absolute",
          ...(isSignUp === false && {
            right: 0,
            borderRadius: "30% 0% 0% 30%",
          }),
          ...(isSignUp === true && {
            left: 0,
            borderRadius: "0% 30% 30% 0%",
          }),
        }}
      >
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "3.5vw",
              fontweight: "400",
              fontFamily: "verdana",
              textAlign: "center",
              lineHeight: "1.75rem",
              marginBottom: "1.5rem",
            }}
          >
            Hello, Friend!
          </Typography>

          <Typography
            sx={{
              fontSize: "1.2vw",
              lineHeight: "1.5rem",
              textAlign: "center",
              marginBottom: "2.5rem",
              fontFamily: "cursive",
            }}
          >
            {!isSignUp ? "Register" : "Sign in"} with your personal details to
            use all<br></br> of site features
          </Typography>
          <Button
            variant="contained"
            onClick={() => setIsSignUp(!isSignUp)} //isSignUp = true !isSignUp = false
            sx={{
              color: "white",
              fontWeight: "500",
              fontSize: "1rem",
              lineHeight: "1.5rem",
            }}
          >
            {!isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
