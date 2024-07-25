import React from "react";
import Calculator from "../calculator/Calculator";
import Eligibility from "../../components/eligibility/Eligibility";
import Intro from "../../components/intro/Intro";
import Advantages from "../../components/advantages/Advantages";
import { bLadvantagesData } from "../data/Data";

const Businessloan = () => {
  return (
    <>
      <Intro
        title={"Grow your Business with fast Business Loans"}
        subTitle={"Unlock Upto ₹30 lakhs in just 5 minutes."}
        homeimg={"/businessLoan.png"}
        home={true}
      />
      <Advantages advantagesData={bLadvantagesData} />

      <div style={loanDescriptionStyle}>
        <h2>About Our Business Loans</h2>
        <p>
          Our business loans are designed to help you grow and expand your business effortlessly. With quick approval processes and minimal documentation, you can get up to ₹30 lakhs in just 5 minutes. Whether you need funds for inventory, equipment, or working capital, we provide flexible loan options to meet your specific needs. Apply now and take your business to new heights.
        </p>
      </div>

      <Calculator />
      <Eligibility />
    </>
  );
};

// Inline styles for the new section
const loanDescriptionStyle = {
  padding: "50px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  margin: "30px 0",
  textAlign: "center",
};

export default Businessloan;
