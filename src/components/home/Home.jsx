import React from "react";
import Calculator from "../calculator/Calculator";
import { customersdata } from "../../components/data/data";
import Customers from "../customers/Customers";
import Intro from "../intro/IntroCarousel.jsx";
import Carousel from "../../components/carousel/Carousel";
import Apply from "../../components/apply/Apply";
import Advantages from "../../components/advantages/Advantages";
import Eligibility from "../../components/eligibility/Eligibility";
import LendingPartners from "../../components/lendingpartners/Lendingpartners";
import Faq from "../faq/Faq";

import { advantagesData } from "../data/Data.jsx";

const Home = () => {
  return (
    <>
      <Intro
        title={"Unsecured Business Loans"}
        subTitle={"Upto ₹30 lakhs in 5 minutes."}
        homeimg={"/header.png"}
        home={true}
      />
      <Carousel />
      <Calculator />
      <Apply />
      <Advantages advantagesData={advantagesData} />
      <Eligibility />
      <LendingPartners />
      <Customers customersdata={customersdata} />
      <Faq />
    </>
  );
};

export default Home;
