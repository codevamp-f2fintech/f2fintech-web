import { Button, Box, Typography } from "@mui/material";

export default function Transition({ isSignUp, setIsSignUp }) {
  return (
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
          height: "60vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
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
          {!isSignUp ? "Register" : "Sign in"} with your personal details to use
          all<br></br> of site features
        </Typography>
        {/* <br></br>
        <br></br>
        <br></br>
        <br></br> */}
        <Button
          variant="contained"
          onClick={() => setIsSignUp(!isSignUp)} //isSignUp = true !isSignUp = false
          sx={{
            width: "10vw",
            color: "white",
            fontWeight: "500",
            fontSize: "1rem",
            lineHeight: "1.5rem",
            borderRadius: "20px",
            top: "-2vh",
          }}
        >
          {!isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </Box>
    </Box>
  );
}
