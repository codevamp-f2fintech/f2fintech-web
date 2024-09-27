import Slider from "react-slick";
import { Box, Typography } from "@mui/material";

import { lendingpartnerData } from "../data/Data.jsx";

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
        paddingBottom: '80px'
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
        {lendingpartnerData.map((lending, index) => (
          <Box key={index}
            sx={{
              height: "auto",
              width: "auto!important",
              display: 'block!important',
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
              <Box sx={{ padding: '20px', background: '#f8f8f8', height: '170px', display: 'flex', justifyContent: 'center' }}>
                <img
                  src={lending.src}
                  style={{
                    height: "80px",
                    width: 'auto',
                    paddingTop: "10px",
                  }}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
