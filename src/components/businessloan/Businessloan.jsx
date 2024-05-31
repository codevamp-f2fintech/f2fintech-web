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
        title={"Grow your Business with fast Bussiness Loans"}
        subTitle={" Unlock Upto ₹30 lakhs in just 5 minutes."}
        homeimg={"/businessLoan.png"}
        home={true}
      />
      <Advantages advantagesData={bLadvantagesData} />

      <Calculator />
      <Eligibility />
    </>
  );
};

export default Businessloan;
