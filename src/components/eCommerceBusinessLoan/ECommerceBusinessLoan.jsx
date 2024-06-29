import React from "react";
import Calculator from "../calculator/Calculator";
import Intro from "../../components/intro/Intro";
import Advantages from "../../components/advantages/Advantages";
import { ecadvantagesData } from "../data/Data";

const ECommerceBusinessLoan = () => {
  return (
    <>
      <Intro
        title={"Grow your E-Commerce Business with easy Loans"}
        subTitle={" Unlock Upto ₹30 lakhs in just 5 minutes."}
        homeimg={"/ecommerce.png"}
        home={true}
      />
      <Advantages advantagesData={ecadvantagesData} />

      <Calculator />
    </>
  );
};

export default ECommerceBusinessLoan;
