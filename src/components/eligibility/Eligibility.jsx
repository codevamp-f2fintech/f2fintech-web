import { Box, Container, Typography } from "@mui/material";

import ButtonComp from "../common/button/Button";

export default function Eligibility() {
  return (
    <Container maxWidth="false" sx={{ paddingBottom: "3%" }}>
      <Container
        maxWidth="false"
        sx={{
          height: "560px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "400px",
            width: "44%",
            borderRadius: "90px 20px 20px 20px",
            paddingTop: "40px",
            paddingLeft: "55px",
            border: "1px solid lightgray",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "1.7vw",
              lineHeight: "1.75",
              marginTop: "1.75",
              color: " rgba(6,55,158,1)",
            }}
          >
            Eligibility & Documentation
          </Typography>
          <Typography
            sx={{
              lineHeight: "5rem",
              fontWeight: "700",
              fontSize: "3.7vw",
              paddingTop: "25px",
              textShadow: "1px 1px 2px gray",
            }}
          >
            Who Can<br></br> Apply?
          </Typography>
        </Box>
        <Box
          sx={{
            height: "400px",
            width: "44%",
            borderRadius: "20px 90px 20px 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background:
              "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(6,55,158,1) 100%)",
            border: "1px solid lightgray",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          }}
        >
          <img src="Eligibility.png" height="400px" />
        </Box>
      </Container>
      <Container
        maxWidth="false"
        sx={{
          height: "400px",
          border: "1px solid lightgray",
          borderRadius: "20px 20px 90px 90px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "91%",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        }}
      >
        <Box
          sx={{
            height: "250px",
            width: "300px",
            marginRight: "20px",
            ":hover": {
              transform: "scale(1.1)",
              background: "white",
              transition: "all 300ms ease-in-out",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <img src="search.png" height="170px" width="250px" />
          </Box>
          <Typography
            variant="h3"
            sx={{
              lineHeight: "1.75rem",
              fontWeight: "500",
              fontSize: "1.5vw",
              maxWidth: "12.5",
              textAlign: "center",
              marginTop: "1.25rem",
            }}
          >
            CIBIL Score of 700 or higher
          </Typography>
        </Box>
        <Box
          sx={{
            height: "250px",
            width: "300px",
            ":hover": {
              transform: "scale(1.1)",
              background: "white",
              transition: "all 300ms ease-in-out",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src="eligibility2.png" height="170px" width="250px" />
          </Box>
          <Typography
            variant="h3"
            sx={{
              lineHeight: "1.75rem",
              fontWeight: "500",
              fontSize: "1.5vw",
              maxWidth: "12.5",
              textAlign: "center",
              marginTop: "1.25rem",
            }}
          >
            Business operational<br></br> for 2+ years
          </Typography>
        </Box>
        <Box
          sx={{
            height: "250px",
            width: "300px",
            ":hover": {
              transform: "scale(1.1)",
              background: "white",
              transition: "all 300ms ease-in-out",
            },
            marginLeft: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src="eligibility3.png" height="170px" width="250px" />
          </Box>
          <Typography
            variant="h3"
            sx={{
              lineHeight: "1.75rem",
              fontWeight: "500",
              fontSize: "1.5vw",
              maxWidth: "12.5",
              textAlign: "center",
              marginTop: "1.25rem",
            }}
          >
            12 months bank <br></br>statement
          </Typography>
        </Box>
      </Container>
      <Container
        sx={{
          marginTop: 5,
          height: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonComp title="Apply Now" width="400px" />
      </Container>
    </Container>
  );
}
