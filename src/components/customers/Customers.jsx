import { useEffect, useState } from "react";
import { Avatar, Container, Typography, Paper, Grid, Box } from "@mui/material";
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
       
      width:'80%',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          display: "flex",
          justifyContent: "center",
         
          lineHeight: "3rem",
          fontSize: "2.5rem",
          fontWeight: "500",
          color:'#07399f',
          marginTop:'50px',
          marginBottom:'20px',
        }}
      >
        Happy & Satisfied Faces
      </Typography>
      <Typography
        variant="h1"
        sx={{
          display: "flex",
          justifyContent: "center",
         
          lineHeight: "3rem",
          fontSize: "1rem",
          fontWeight: "300",
          marginBottom:'40px',
        }}
      >
       Here is what some of our satisfied clients have to say about my work
      </Typography>
      <Carousel >
        {customersdata.length && customersdata.map((customer, i) => (
         <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}  key={i}>
            <Grid xs={5} sx={{padding:'50px'}}>
              <Box sx={{ background:'#07399f', display:'inline-block', paddingLeft:'20px',paddingBottom:'20px', borderRadius:'10px'}}>
            <img
              src={customer.img}
              style={{ height: "auto", width: "400px",marginTop:'-20px',marginRight:'-20px',borderRadius:'10px' }}
            />
            </Box>
              </Grid>
              <Grid xs={7}>
              <Box sx={{padding:'50px'}}>
              <Typography
              variant="h3"
              sx={{
                wordWrap: "break-word",
               position:'relative',
                lineHeight: "2rem",
                textAlign: "left",
                marginTop: "50px",
              }}
            >
              <span style={{fontSize:'3rem',color:'#07399f', position:'absolute', left:'-50px'}}>❝</span>
              
              {customer.description}
              <span style={{fontSize:'3rem',color:'#07399f',position:'absolute', right:'-10px'}}>❞</span>
            </Typography>
            <Typography sx={{ color: "#07399f", fontSize: "1.2rem", fontWeight:'600', marginTop:'20px' }}>
              {customer.name}
            </Typography>
            <Typography sx={{ color: "gray", fontSize: "1rem", fontWeight:'500', marginTop:'10px' }}>{customer.address}</Typography>
            </Box>
                </Grid>
              </Grid>
         
        //  <Paper
        //     key={i}
        //     sx={{
        //       display: "flex",
        //       flexDirection: "column",
        //       justifyContent: "center",
        //       alignItems: "center",
        //       boxShadow: 0,
        //       padding: "20px",
        //       margin: "20px",
        //       cursor: "pointer",
        //       "&:hover": {
        //         boxShadow: 4,
        //         transform: "scale(1.02)",
        //       },
        //     }}
        //   >
           
          
       
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
