import React from "react";
import Calculator from "../calculator/Calculator";
import Intro from "../intro/Intro";
import Advantages from "../../components/advantages/Advantages";
import { unadvantagesData } from "../data/Data";

const UnsecuredLoan = () => {
  return (
    <>
      <Intro
        title={"Empower your Business with Unsecured Bussiness Loans"}
        subTitle={"Unlock Upto ₹30 lakhs in 5 minutes."}
        homeimg={"/unsecured.png"}
        home={true}
      />
      <Advantages advantagesData={unadvantagesData} />
      <Calculator />
    </>
  );
};

export default UnsecuredLoan;
