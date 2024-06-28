import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ButtonComp from "../common/button/Button";

const fetchCarouselItems = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/get-loan-provider"
    );
    console.log("API Response:", response.data);
    return response.data.data.rows;
  } catch (error) {
    console.error("Error fetching carousel items:", error);
    return [];
  }
};

function Intro({ title, home, homeimg, interestRate, text }) {
  return (
    <Container
      sx={{
        display: "flex",
        padding: "0px !important",
        maxWidth: "100% !important",
        height: "90vh",
        marginTop: "10px !important",
        backgroundColor: "#f8f8f8",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          padding: "60px",
          height: "100%",
          maxWidth: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "2.5vw",
            fontWeight: "700",
            color: "rgba(6,55,158,1)",
            textShadow: "1px 1px 2px gray",
            marginBottom: "20px",
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            marginBottom: "20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "2.2vw",
              textShadow: "1px 1px 2px gray",
              background: "#fff",
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
              marginBottom: "20px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "1.2vw",
                textShadow: "1px 1px 2px gray",
                marginBottom: "10px",
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
                marginBottom: "10px",
              }}
            >
              {interestRate}
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "1.7vw",
                textShadow: "1px 1px 2px gray",
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
          marginTop: "110px",
          marginRight: "10px",
          height: "60%",
          width: "50%",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderTopLeftRadius: "30px",
            borderBottomRightRadius: "30px",
          }}
          src={homeimg}
          alt={title}
        />
      </Box>
    </Container>
  );
}

export default function IntroCarousel() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCarouselItems = async () => {
      const items = await fetchCarouselItems();
      setCarouselItems(items);
      setLoading(false);
    };

    getCarouselItems();
  }, []);

  if (loading) {
    return <Typography sx={{ textAlign: "center" }}>Loading...</Typography>; //
  } else if (carouselItems.length > 0) {
    return (
      <Carousel autoPlay interval={3000}>
        {carouselItems.map((item, index) => (
          <Intro
            key={index}
            title={item.title}
            home={item.home}
            homeimg={item.homeimage}
            interestRate={item.interest_rate}
            text={{
              description: item.description,
              short_description: item.short_description,
              long_description: item.long_description,
            }}
          />
        ))}
      </Carousel>
    );
  } else {
    return (
      <Typography sx={{ textAlign: "center" }}>No items available</Typography>
    );
  }
}
