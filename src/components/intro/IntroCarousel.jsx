import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Carousel from "react-material-ui-carousel";
import PropTypes from "prop-types";

import { setLoanProviders } from "../../redux/actions/LoanProviderAction";
import API from "../../apis";
import Intro from "./Intro";

export default function IntroCarousel() {
  const dispatch = useDispatch();
  const loanProviders = useSelector((state) => state.allLoanProviders);

  useEffect(() => {
    API.LoanProviderAPI.getAll()
      .then((response) => {
        console.log(response, "loanproviderapi");
        if (response.data.status === "Success") {
          dispatch(
            setLoanProviders({
              listData: response.data.data.rows,
            })
          );
        }
      })
      .catch((error) => {
        console.log(error, "loanproviderapierror");
      });
  }, []);

  console.log(loanProviders?.listData);
  return (
    <Carousel autoPlay interval={3000}>
      {loanProviders?.listData?.map((item, index) => (
        <Intro
          key={index}
          title={item.title}
          home={item.is_home}
          homeimg={item.home_image}
          interestRate={item.interest_rate}
          text={{
            description: item.description,
            short_description: item.short_description,
            long_description: item.long_description,
          }}
        />
      ))}
    </Carousel>
  );
}

Intro.propTypes = {
  title: PropTypes.string.isRequired,
  home: PropTypes.bool.isRequired,
  homeimg: PropTypes.string.isRequired,
};
