import { Avatar, Container, Typography, Box, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import React from "react";

const Customers = ({ customersdata }) => {
  return (
    <Container
      maxWidth="false"
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: "30px",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "80px",
          lineHeight: "3rem",
          fontSize: "2.5rem",
          fontWeight: "400",
        }}
      >
        What our Customers have to say.
      </Typography>
      <Carousel height={"59vh"}>
        {customersdata.map((customers, i) => (
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: 0,
              height: "59vh",
            }}
          >
            <Avatar
              key={customers.name}
              src={customers.img}
              sx={{ height: "150px", width: "150px" }}
            />
            <Typography
              variant="h3"
              sx={{
                wordWrap: "normal",
                width: "70%",
                lineHeight: "2rem",
                textAlign: "center",
              }}
            >
              {customers.description}
            </Typography>
            <Typography sx={{ color: "purple", fontSize: "20px" }}>
              {customers.name}
            </Typography>
            <Typography sx={{ color: "blue" }}>{customers.address}</Typography>
          </Paper>
        ))}
      </Carousel>
    </Container>
  );
};

export default Customers;
