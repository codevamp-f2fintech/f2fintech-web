import React from "react";
import Calculator from "../calculator/Calculator";
import Intro from "../../components/intro/Intro";
import Advantages from "../../components/advantages/Advantages";
import { bLadvantagesData } from "../data/Data";

const MsmeLoan = () => {
  return (
    <>
      <Intro
        title={"Fuel your Business with fast MSME Loans"}
        subTitle={" Unlock Upto ₹30 lakhs in just 5 minutes."}
        homeimg={"/msmeLoan.png"}
        home={true}
      />
      <Advantages advantagesData={bLadvantagesData} />
      <Calculator />
    </>
  );
};

export default MsmeLoan;
