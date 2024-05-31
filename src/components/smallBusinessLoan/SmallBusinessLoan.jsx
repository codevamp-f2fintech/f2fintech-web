import React from "react";
import Calculator from "../calculator/Calculator";
import Intro from "../intro/Intro";

const SmallBusinessLoan = () => {
  return (
    <>
      <Intro
        title={"Empower your Business with Small Bussiness Loans"}
        subTitle={"Unlock Upto ₹30 lakhs in 5 minutes."}
        homeimg={"/smallBusinessLoan.png"}
        home={true}
      />
      <Calculator />
    </>
  );
};

export default SmallBusinessLoan;
