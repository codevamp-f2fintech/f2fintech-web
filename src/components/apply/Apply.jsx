import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { tokens, themeSettings } from "../../theme";

export default function Apply() {
  const theme = useTheme();
  const colors = tokens(theme);
  const { typography } = themeSettings(theme);
  return (
    <Container
      maxWidth="false"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "800px",
        marginTop: "40px",
      }}
    >
      <Typography
        sx={{
          color: colors.textBlack,
          justifyContent: "center",
          display: "flex",
          marginTop: "0px",
          variant: "h4",
          lineHeight: "4rem",
          fontSize: "2.5vw",
          fontWeight: "300",
          zIndex: "1",
        }}
      >
        Apply now in 4 easy steps
      </Typography>
      <Container
        maxWidth="false"
        sx={{
          height: "600px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 !important",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
          }}
        >
          <img src="chart1.png" style={{ aspectRatio: "4/3" }} />
        </Box>
        <Box
          sx={{
            width: "50%",
            height: "500px",
          }}
        >
          <Box
            sx={{
              height: "120px",
              maxWidth: "100% !important",
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10%",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
              ":hover": {
                transform: "scale(1.1)",
                background: "white",
                transition: "all 300ms ease-in-out",
              },
            }}
          >
            <Typography
              sx={{
                height: "40px",
                width: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                  "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(6,55,158,1) 100%)",
                color: "white",
                borderRadius: "5px",
              }}
            >
              01
            </Typography>
            <Typography
              sx={{
                marginLeft: "15px",
                fontSize: "1.2vw",
                lineHeight: "1.75rem",
                fontWeight: "700",
                width: "538px",
              }}
            >
              Enter your personal, business & bank details to get a fair loan
              offer
            </Typography>
          </Box>
          <Box
            sx={{
              height: "120px",
              maxWidth: "100% !important",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10%",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
              ":hover": {
                transform: "scale(1.1)",
                background: "white",
                transition: "all 300ms ease-in-out",
              },
            }}
          >
            <Typography
              sx={{
                height: "40px",
                width: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                  "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(6,55,158,1) 100%)",
                color: "white",
                borderRadius: "5px",
              }}
            >
              02
            </Typography>
            <Typography
              sx={{
                marginLeft: "15px",
                fontSize: "1.2vw",
                lineHeight: "1.75rem",
                fontWeight: "700",
                width: "538px",
              }}
            >
              Compare the loan offers & choose the best suited option
            </Typography>
          </Box>
          <Box
            sx={{
              height: "120px",
              maxWidth: "100% !important",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10%",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
              ":hover": {
                transform: "scale(1.1)",
                background: "white",
                transition: "all 300ms ease-in-out",
              },
            }}
          >
            <Typography
              sx={{
                height: "40px",
                width: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                  "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(6,55,158,1) 100%)",
                color: "white",
                borderRadius: "5px",
              }}
            >
              03
            </Typography>
            <Typography
              sx={{
                marginLeft: "15px",
                fontSize: "1.2vw",
                lineHeight: "1.75rem",
                fontWeight: "700",
                width: "538px",
              }}
            >
              Accept the loan offer & complete your documentation & KYC
            </Typography>
          </Box>
          <Box
            sx={{
              height: "120px",
              maxWidth: "100% !important",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10%",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
              ":hover": {
                transform: "scale(1.1)",
                background: "white",
                transition: "all 300ms ease-in-out",
              },
            }}
          >
            <Typography
              sx={{
                height: "40px",
                width: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                  "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(6,55,158,1) 100%)",
                color: "white",
                borderRadius: "5px",
              }}
            >
              04
            </Typography>
            <Typography
              sx={{
                marginLeft: "15px",
                fontSize: "1.2vw",
                lineHeight: "1.75rem",
                fontWeight: "700",
                width: "538px",
              }}
            >
              Choose from flexible repayment options and start receiving funds
            </Typography>
          </Box>
        </Box>
      </Container>
    </Container>
  );
}
