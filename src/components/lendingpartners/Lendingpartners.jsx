import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import { lendingpartnerData } from "../data/Data.jsx";

import Slider from "react-slick";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4, // Show 4 items at once
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};


export default function LendingPartners() {
  const settings = {
    dots: false, // No dots for navigation
    arrows: false, // No arrows for navigation
    infinite: true, // Infinite loop
    speed: 10000, // Slow down the speed for continuous scrolling (10 seconds for a full scroll)
    slidesToShow: 4, // Number of slides visible at once
    slidesToScroll: 1, // Number of slides to scroll at once
    autoplay: true, // Autoplay to enable scrolling
    autoplaySpeed: 0, // Disable any delay between slides, making it continuous
    cssEase: "linear", // Linear easing for constant scrolling speed
    pauseOnHover: false, // No pausing on hover for continuous scroll
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
   
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#003a6d",
          paddingBottom:'80px'
        }}
      >
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            marginBottom: "50px",
            paddingTop: "50px",
            lineHeight: "4rem",
            fontSize: "1.5vw",
            fontWeight: "300",
          }}
        >
          {"Official Lending Partners"}
        </Typography>
      
          <Slider {...settings}>
          {lendingpartnerData.map((lending) => (
            
            <Box key={lending.id}
              sx={{
                height: "auto",
                width: "auto!important",
                display:'block!important',
                borderRadius: "20px",
                margin: "0 10px",
                backgroundColor: "white",
                padding: "10px",
              
                justifyContent: "center",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                ":hover": {
                  transform: "scale(.99)",
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
                <Box sx={{padding:'20px', background:'#f8f8f8', height:'170px', display:'flex', justifyContent:'center'}}>
                <img
                  src={lending.src}
                  style={{
                    height: "80px",
                    width:'auto',
                    paddingTop: "10px",
                  }}
                />
                </Box>
                <Box sx={{padding:'50px 20px'}}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    fontWeight: "500",
                    fontSize: ".9vw",
                  }}
                >
                  {lending.title}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    fontSize: "1.3vw",
                    margin:'20px 0px'
                  }}
                >
                  {lending.name}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    fontSize: "1vw",
                    color:'#003b6f!important',
                    display:'flex',
                    alignItems:'center',
                    marginBottom:'20px',
                  }}
                >
                  <img
                  src="new/web.png"
                  style={{
                    height: "auto",
                    width:'26px',
                   marginRight:'6px'
                  }}
                />
                  {lending.web}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    fontSize: "1vw",
 display:'flex',
                    alignItems:'center'
                  }}
                >
                   <img
                  src="new/contact.png"
                  style={{
                    height: "auto",
                    width:'26px',
                   marginRight:'6px'
                  }}
                />
                  {lending.email} {"|"} {lending.contact}
                </Box>
                </Box>
              </Box>
            </Box>
          ))}
         </Slider>
     
      </Box>
   
  );
}
