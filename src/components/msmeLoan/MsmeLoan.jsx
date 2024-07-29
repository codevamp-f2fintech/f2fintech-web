import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Calculator from "../calculator/Calculator";
import Eligibility from "../../components/eligibility/Eligibility";
import Intro from "../../components/intro/Intro";
import Advantages from "../../components/advantages/Advantages";
import { bLadvantagesData } from "../data/Data";

const MsmeLoan = () => {
  // Scroll to the section when the component mounts
  React.useEffect(() => {
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
      <GlobalStyles />
      <Intro
        title={"Empower Your MSME with Quick MSME Loans"}
        subTitle={"Unlock Up to ₹50 lakhs in just 10 minutes."}
        home={true}
      />
      <Advantages advantagesData={bLadvantagesData} />

      <LoanDescriptionContainer>
        <ImageContainer>
          <StyledImage src="/msmeLoan.png" alt="MSME Loan" />
        </ImageContainer>
        <TextContainer>
          <Title>About Our MSME Loans</Title>
          <Text>
            Our MSME loans are tailored to support the growth and expansion of small and medium-sized enterprises. With fast approval processes and minimal documentation, you can get up to ₹50 lakhs in just 10 minutes.
          </Text>
          <Text>
            Whether you need funds for inventory, equipment, or working capital, we provide flexible loan options to meet your specific needs.
          </Text>
          <Text id="about-msme-loans">
            Apply now and elevate your MSME to new heights.
          </Text>
        </TextContainer>
      </LoanDescriptionContainer>

      <Calculator />
      <Eligibility />
    </>
  );
};

const LoanDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
  background-color: #ffffff;
  background-size: contain; 
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
  margin: 40px auto; 
  max-width: 97%; 
  box-shadow: 0 8px 16px #8a8a8a; 
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const TextContainer = styled.div`
  flex: 1;
  padding-left: 20px;
  text-align: justify;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 2.5vw; 
  font-weight: 650; 
  margin-bottom: 20px;
  margin-left: 12px; 
  color: #333; 
  text-shadow: -1px 1px 5px rgba(0, 0, 0, 0.5); 
  padding: 10px 0;
  text-align: start; 
`;

const Text = styled.p`
  font-size: 1.3rem; 
  line-height: 1.6;
  color: black;
  margin-bottom: 20px;
  text-align: justify; 
  padding: 10px;
  border-radius: 10px; 
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 10px;
`;

const GlobalStyles = createGlobalStyle`
  body {
    box-shadow: 0 4px 8px rgba(204, 6, 6, 0.1); 
  }

  body:hover {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2); 
  }
`;

export default MsmeLoan;
