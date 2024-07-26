import React, { useState } from "react";

import { Container, useMediaQuery } from "@mui/material";

import Signin from "./Signin";
import Signup from "./Signup";
import Transition from "./Transition";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const isMobile = useMediaQuery("(max-width:480px)");
  console.log("issignup", isSignUp);

  return (
    <Container
      sx={{
        height: "100vh",
        minWidth: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: isMobile ? "column" : "row",
        padding: "0 !important",
        marginTop: "1vh",
        backgroundColor: "#f2f2f2",
      }}
    >
      <Signin isSignUp={isSignUp} />
      <Signup isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
      <Transition isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
    </Container>
  );
};

export default LoginPage;
