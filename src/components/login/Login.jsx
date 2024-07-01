import { Box, Container } from "@mui/material";
import React from "react";

const Login = () => {
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
      <Signin isSignUp={isSignUp} />
      <Signup isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
      <Transition isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
    </Container>
  );
};

export default Login;
