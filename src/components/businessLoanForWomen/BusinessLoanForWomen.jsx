import { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";

import Calculator from "../calculator/Calculator";
import Eligibility from "../../components/eligibility/Eligibility";
import Intro from "../../components/intro/Intro";
import Advantages from "../../components/advantages/Advantages";
import { bLadvantagesData } from "../data/Data";

const BusinessLoanForWomen = () => {
  // Scroll to the section when the component mounts
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <>
      <Intro
        title={"Empower Your Business with Loans for Women Entrepreneurs"}
        subTitle={"Unlock Up to ₹30 lakhs in just 5 minutes."}
        home={true}
      />
      <Advantages advantagesData={bLadvantagesData} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "40px",
          backgroundColor: "#ffffff",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRadius: "10px",
          margin: "40px auto",
          maxWidth: "97%",
          boxShadow: "0 8px 16px #8a8a8a",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img
            src="/women.png"
            alt="Business Loan For Women"
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
              borderRadius: '10px',
            }}
          />
        </Box>
        <Container sx={{ flex: 1, paddingLeft: '20px', textAlign: 'justify' }}>
          <Typography
            id="about-business-loans-for-women"
            component='h2'
            sx={{
              fontSize: '2.5vw',
              fontWeight: 650,
              marginBottom: '20px',
              marginLeft: '12px',
              color: '#333',
              textShadow: '-1px 1px 5px rgba(0, 0, 0, 0.5)',
              padding: '10px 0',
              textAlign: 'start',
            }}
          >
            About Our Business Loans for Women
          </Typography>
          <Typography
            component='h5'
            sx={{
              fontSize: '1.3rem',
              lineHeight: 1.6,
              color: 'black',
              marginBottom: '20px',
              textAlign: 'justify',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            Our business loans for women are designed to help female
            entrepreneurs grow and expand their businesses effortlessly. With
            quick approval processes and minimal documentation, you can get up
            to ₹30 lakhs in just 5 minutes.
          </Typography>
          <Typography
            component='h5'
            sx={{
              fontSize: '1.3rem',
              lineHeight: 1.6,
              color: 'black',
              marginBottom: '20px',
              textAlign: 'justify',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            Whether you need funds for inventory, equipment, or working capital,
            we provide flexible loan options to meet your specific needs.
          </Typography>
          <Typography
            component='h5'
            sx={{
              fontSize: '1.3rem',
              lineHeight: 1.6,
              color: 'black',
              marginBottom: '20px',
              textAlign: 'justify',
              padding: '10px',
              borderRadius: '10px',
            }}
          >
            Apply now and take your business to new heights.
          </Typography>
        </Container>
      </Box>

      <Calculator />
      <Eligibility />
    </>
  );
};

export default BusinessLoanForWomen;
