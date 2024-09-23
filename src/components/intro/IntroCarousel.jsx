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
      {/* {loanProviders?.listData?.map((item, index) => ( */}
        <Intro
          key={1}
          title={'HDFC Bank'}
          home={true}
          homeimg={'../new/sl_121021_47240_16.jpg'}
          interestRate={'8%'}
          text={{
            description: 'Get Loan 8% Interest Rate in HDFC Bank',
            short_description: 'Loan at 8%',
            long_description: 'hi this is lorem ipsum text for demo',
          }}
        />
      
      {/* ))} */}
    </Carousel>
  );
}

Intro.propTypes = {
  title: PropTypes.string.isRequired,
  home: PropTypes.bool.isRequired,
  homeimg: PropTypes.string.isRequired,
};
