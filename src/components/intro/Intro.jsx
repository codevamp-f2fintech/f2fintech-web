import { Box, Container, Typography } from "@mui/material";

import ButtonComp from "../common/button/Button";

export default function Intro({ title, home, homeimg }) {
  return (
    <Container
      sx={{
        display: "flex",
        boxSizing: "content-box",
        padding: "0px !important",
        maxWidth: "100% !important",
        height: "100vh",
        marginTop: "0px !important",
      }}
    >
      <Box
        sx={{
          margin: " 10px 85px",
          height: "90vh",
          zIndex: 2,
          maxWidth: "40vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Typography
          sx={{
            variant: "h1",
            display: "flex",
            marginTop: "0px",
            lineHeight: "5rem",
            fontSize: "4.5vw",
            fontWeight: "700",
            textShadow: "1px 1px 2px gray",
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "100vh",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontFamily: "cursive",
              fontSize: "2.2vw",
              lineHeight: "2.25rem",
              marginTop: ".25rem",
              textShadow: "1px 1px 2px gray",
            }}
          >
            Upto<strong> ₹30 lakhs</strong> in 5 minutes.
          </Typography>
        </Box>
        <ButtonComp title="Apply Now" width="160px" />
        {home && (
          <Box>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "1.2vw",
                lineHeight: "1.5",
                margin: 0,
                textShadow: "1px 1px 2px gray",
              }}
            >
              Powered by f2fintech & trusted by
            </Typography>
            <Typography
              sx={{
                color: " rgba(6,55,158,1)",
                fontSize: "3vw",
                lineHeight: "3.375rem",
                marginTop: ".25rem",
                fontWeight: "700",
                textShadow: "1px 1px 2px gray",
              }}
            >
              30,00,000+
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "1.7vw",
                lineHeight: "2rem",
                marginTop: ".25rem",
                textShadow: "1px 1px 2px gray",
              }}
            >
              Businesses in India
            </Typography>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "90vh",
          width: "50%",
        }}
      >
        <img
          height="625px"
          style={{ overflow: "hidden" }}
          src={homeimg}
          alt="null"
        />
      </Box>
    </Container>
  );
}
