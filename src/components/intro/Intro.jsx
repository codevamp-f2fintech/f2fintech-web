import { Box, Container, Typography } from "@mui/material";

import ButtonComp from "../common/button/Button";

export default function Intro({ title, home, homeimg, interestRate, text }) {
  console.log("homeimage", homeimg);
  return (
    <Container
      sx={{
        display: "flex",
        padding: "0px !important",
        maxWidth: "100% !important",
        height: "140vh !important",
        // backgroundColor: "#f8f8f8",
        // boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
        // border: "2px solid red",
      }}
    >
      <Box
        sx={{
          paddingLeft: "10vh",
          height: "125vh",
          maxWidth: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: "5vh",
          // border: "2px solid yellow",
        }}
      >
        <Typography
          sx={{
            marginTop: "5vh",
            fontSize: "2.5vw",
            fontWeight: "700",
            // color: "rgba(6,55,158,1)",
            textShadow: "1px 1px 2px gray",
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            marginTop: "5vh",
            height: "30vh",
            // border: "2px solid red",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.5vw",
              textShadow: "1px 1px 2px gray",
              // background: "#fff",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {text.description}
          </Typography>
        </Box>

        {home && (
          <Box
            sx={{
              height: "80vh",
              marginTop: "5vh",
            }}
          >
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "1.2vw",
                textShadow: "1px 1px 2px gray",
              }}
            >
              {text.short_description}
            </Typography>
            <Typography
              sx={{
                color: "rgba(6,55,158,1)",
                fontSize: "3vw",
                fontWeight: "700",
                textShadow: "1px 1px 2px gray",
                marginBottom: "6vh",
              }}
            >
              {interestRate}
            </Typography>
            <Typography
              sx={{
                fontWeight: "800",
                fontSize: "1.4vw",
              }}
            >
              {text.long_description}
            </Typography>
          </Box>
        )}
        <ButtonComp title="Calculate Returns" width="190px" />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "50px",
          alignItems: "center",
          marginTop: "20vh",
          marginRight: "10px",
          height: "80vh",
          width: "50vw",
          // border: "2px solid",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "fit",
            borderTopLeftRadius: "50px",
            borderBottomRightRadius: "50px",
          }}
          src={homeimg}
          alt={title}
        />
      </Box>
    </Container>
  );
}
