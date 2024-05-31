import React from "react";
import Calculator from "../calculator/Calculator";
import Intro from "../../components/intro/Intro";
import Advantages from "../../components/advantages/Advantages";
import { woadvantagesData } from "../data/Data";

const BusinessLoanForWomen = () => {
  return (
    <>
      <Intro
        title={"Empower your Business with Women Bussiness Loans"}
        subTitle={" Unlock Upto ₹30 lakhs in just 5 minutes."}
        homeimg={"/women.png"}
        home={true}
      />
      <Advantages advantagesData={woadvantagesData} />

      <Calculator />
    </>
  );
};

export default BusinessLoanForWomen;
