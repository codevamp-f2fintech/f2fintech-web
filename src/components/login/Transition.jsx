import { Button, Box, Typography, useMediaQuery } from "@mui/material";

export default function Transition({ isSignUp, setIsSignUp }) {
  const isMobile = useMediaQuery("(max-width:480px)");

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: isMobile
          ? "transparent"
          : "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(6,55,158,1) 100%)",
        color: "white",
        zIndex: 2,
        position: "absolute",
        // transition: "all 1s ease",
        right: isSignUp ? "unset" : 0,
        left: isSignUp ? 0 : "unset",
        borderRadius: isSignUp ? "0% 30% 30% 0%" : "30% 0% 0% 30%",
        width: { xs: "100%", sm: "50%" }, // Adjust width for smaller screens
      }}
    >
      <Box
        sx={{
          height: { xs: "40vh", sm: "60vh" }, // Adjust height for smaller screens
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {!isMobile && (
          <>
            <Typography
              sx={{
                fontSize: { xs: "6vw", sm: "3.5vw" }, // Adjust font size for smaller screens
                fontWeight: "400",
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
                fontSize: { xs: "3vw", sm: "1.2vw" }, // Adjust font size for smaller screens
                lineHeight: "1.5rem",
                textAlign: "center",
                marginBottom: "2.5rem",
                fontFamily: "cursive",
              }}
            >
              {!isSignUp ? "Register" : "Sign in"} with your personal details to
              use all<br></br> of site features
            </Typography>
          </>
        )}
        <Button
          variant="contained"
          onClick={() => setIsSignUp(!isSignUp)}
          sx={{
            marginTop: isMobile ? "300px" : "0px",
            width: { xs: "60%", sm: "10vw" }, // Adjust width for smaller screens
            color: "white",
            fontWeight: "500",
            fontSize: { xs: "1.2rem", sm: "1rem" }, // Adjust font size for smaller screens
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
