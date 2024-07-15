import React, { useState } from "react";

import { Container } from "@mui/material";

import Signin from "./Signin";
import Signup from "./Signup";
import Transition from "./Transition";

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
        marginTop: "1vh",
      }}
    >
      <Signin isSignUp={isSignUp} />
      <Signup isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
      <Transition isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
    </Container>
  );
};

export default LoginPage;
