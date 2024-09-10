import { useEffect, useState } from "react";
import { Avatar, Container, Typography, Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import PropTypes from "prop-types";

import API from "../../apis";

const Customers = ({ customersdata }) => {
  const [customerRatings, setCustomerRatings] = useState([]);

  useEffect(() => {
    API.RatingRevAPI.getRating()
      .then((res) => {
        if (res) {
          const ratingData = res.data.data.reviews;
          console.log('ratingdata', ratingData)

          // Create an array of promises for fetching customer profiles
          const profilePromises = ratingData.map((cust) =>
            API.CustomerAPI.getCustomerProfile(cust.id)
              .then((profile) => ({
                ...cust,
                profile: profile.data.data.customer,
              }))
              .catch((profileErr) => {
                console.log("Profile error", profileErr);
                return { ...cust, profile: null }; // Handle the error case for profile
              })
          );

          // Wait for all profile requests to complete
          Promise.all(profilePromises)
            .then((ratingsWithProfiles) => {
              setCustomerRatings(ratingsWithProfiles);
            })
            .catch((err) => {
              console.log("Error in processing profiles", err);
            });
        }
      })
      .catch((err) => {
        console.log("Error fetching ratings:", err);
      });
  }, []);

  console.log("customerRatings", customerRatings, customersdata);

  return (
    <Container
      maxWidth="false"
      sx={{
        height: "105vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: "30px",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "80px",
          lineHeight: "3rem",
          fontSize: "2.5rem",
          fontWeight: "400",
        }}
      >
        What Our Customers Say
      </Typography>
      <Carousel height={"70vh"}>
        {customersdata.length && customersdata.map((customer, i) => (
          <Paper
            key={i}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: 0,
              padding: "20px",
              margin: "20px",
              cursor: "pointer",
              "&:hover": {
                boxShadow: 4,
                transform: "scale(1.02)",
              },
            }}
          >
            <Avatar
              src={customer.img}
              sx={{ height: "150px", width: "150px", marginBottom: "20px" }}
            />
            <Typography
              variant="h3"
              sx={{
                wordWrap: "break-word",
                width: "70%",
                lineHeight: "2rem",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              {customer.description}
            </Typography>
            <Typography sx={{ color: "purple", fontSize: "20px" }}>
              {customer.name}
            </Typography>
            <Typography sx={{ color: "blue" }}>{customer.address}</Typography>
          </Paper>
        ))}
      </Carousel>
    </Container>
  );
};

Customers.propTypes = {
  customersdata: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    })
  )
};

export default Customers;
