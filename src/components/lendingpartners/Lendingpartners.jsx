import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import { lendingpartnerData } from "../data/Data";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function LendingPartners() {
  return (
    <Container
      sx={{
        maxWidth: "100% !important",
        display: "flex",
        height: "170vh",
        alignItems: "center",
        backgroundColor: "#EEEEEE",
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#EEEEEE",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "rgba(100, 116, 139)",
            marginBottom: "50px",
            lineHeight: "4rem",
            fontSize: "1.5vw",
            fontWeight: "300",
          }}
        >
          {"Official Lending Partners"}
        </Typography>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {lendingpartnerData.map((lending) => (
            <Box
              sx={{
                height: "300px",
                width: "600px",
                borderRadius: "20px",
                margin: "10px",
                backgroundColor: "white",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
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
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <img
                  src={lending.src}
                  style={{
                    height: "80px",
                    paddingTop: "10px",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "600",
                    fontSize: ".9vw",
                  }}
                >
                  {lending.title}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    letterSpacing: ".1rem",
                    fontSize: "1.5vw",
                  }}
                >
                  {lending.name}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "1vw",
                  }}
                >
                  {lending.web}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "1vw",
                  }}
                >
                  {lending.email} {"|"} {lending.contact}
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
