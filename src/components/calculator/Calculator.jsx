import React, { useState } from "react";

import {
  Typography,
  FilledInput,
  Box,
  Container,
  InputAdornment,
} from "@mui/material";

import "./Calculator.css";

function EMICalculator(props) {
  const [amount, setAmount] = useState(50000);
  const [years, setYears] = useState(1);
  const [interest, setInterest] = useState(1);
  const [monthlyEMI, setMonthlyEMI] = useState("");
  const [totalpayable, setTotalPayable] = useState("");

  const changeValue = (get_id, to_id, setValue) => {
    const inputAmt = document.getElementById(get_id).value;
    document.getElementById(to_id).value = inputAmt;
    setValue(inputAmt);
  };

  const changeRange = (id, setState) => {
    setState(document.getElementById(id).value);
  };

  const calculate = () => {
    const principal = amount;
    const annualInterestRate = interest * 0.01;
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfMonths = years * 12;

    // EMI calculation using the standard formula
    const numerator =
      principal *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, numberOfMonths);
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1;
    const monthlyEMI = numerator / denominator;

    const totalPayable = monthlyEMI * numberOfMonths;

    setMonthlyEMI(`${monthlyEMI.toFixed(2)}`);
    setTotalPayable(`${totalPayable.toFixed(2)}`);
  };

  const handleAmountChange = () => {
    changeValue("txtAmount", "slideAmount", setAmount);
    calculate();
  };

  const handleRangeChange = () => {
    changeRange("slideAmount", setAmount);
    calculate();
  };
  const handleValueChange = () => {
    changeValue("txtYear", "slideYear", setYears);
    calculate();
  };
  const handleChangeRange = () => {
    changeRange("slideYear", setYears);
    calculate();
  };

  const handlechangeValue = () => {
    changeValue("txtInterest", "slideInterest", setInterest);
    calculate();
  };
  const handlechangeRange = () => {
    changeRange("slideInterest", setInterest);
    calculate();
  };

  return (
    <>
      <Container
        maxWidth="false"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "130vh",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          background:
            "linear-gradient(to right, rgba(0, 235, 219, 0.5), rgba(189, 113, 236, 0.5))",
          borderRadius: "0% 100% 0% 100% / 0% 100% 0% 100%",
          padding: "30px",
          margin: "0px",
          marginTop: "30px",
        }}
      >
        <Typography
          sx={{
            justifyContent: "center",
            display: "flex",
            marginTop: "0px",
            variant: "h4",
            lineHeight: "4rem",
            fontSize: "2.5vw",
            fontWeight: "300",
          }}
        >
          Happy place to apply for your loan
        </Typography>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            height: "100vh",
            width: "90%",
          }}
        >
          <Box
            style={{
              width: "100%",
              border: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "20%",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
            }}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                height: "85%",
                width: "90%",
                padding: "10px 20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "12vh",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "2vw",
                  }}
                >
                  How much are you looking for?
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "cursive",
                    fontSize: "1vw",
                  }}
                >
                  Select your loan amount below and elevate your business.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "20vh",
                }}
              >
                <Typography sx={{ fontSize: "1vw" }}>
                  {"Loan Amount"}
                </Typography>
                <FilledInput
                  type="number"
                  disableUnderline={true}
                  sx={{
                    width: "35%",
                    height: "50px",
                    fontSize: "16px",
                    borderRadius: "40px",
                  }}
                  inputProps={{
                    style: {
                      padding: 0,
                    },
                  }}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 7);
                  }}
                  id="txtAmount"
                  onChange={handleAmountChange}
                  value={amount}
                  startAdornment={
                    <InputAdornment position="start">₹</InputAdornment>
                  }
                />
                <input
                  id="slideAmount"
                  min="50000"
                  max="4000000"
                  value={amount}
                  onChange={handleRangeChange}
                  type="range"
                  style={{ width: "80%", flexGrow: 1 }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "20vh",
                }}
              >
                <Typography sx={{ fontSize: "1vw" }}>
                  {"Tenure years"}
                </Typography>
                <FilledInput
                  type="number"
                  disableUnderline={true}
                  style={{
                    width: "35%",
                    height: "50px",
                    border: "none",
                    fontSize: "16px",
                    borderRadius: "40px",
                    textDecoration: "none",
                  }}
                  inputProps={{
                    style: {
                      padding: "0 20px",
                    },
                  }}
                  onInput={(e) => {
                    e.target.value = e.target.value <= 30 ? e.target.value : 30;
                  }}
                  id="txtYear"
                  onChange={handleValueChange}
                  value={years}
                />
                <input
                  id="slideYear"
                  min="1"
                  max="30"
                  value={years}
                  onChange={handleChangeRange}
                  type="range"
                  style={{ width: "80%", flexGrow: 1 }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "20vh",
                }}
              >
                <Typography sx={{ fontSize: "1vw" }}>
                  {" Interest rate "}
                </Typography>
                <FilledInput
                  type="number"
                  disableUnderline={true}
                  style={{
                    width: "35%",
                    height: "50px",
                    border: "none",
                    fontSize: "16px",
                    borderRadius: "40px",
                    textDecoration: "none",
                  }}
                  inputProps={{
                    style: {
                      padding: "0 20px",
                    },
                  }}
                  onInput={(e) => {
                    e.target.value = e.target.value <= 30 ? e.target.value : 30;
                  }}
                  id="txtInterest"
                  onChange={handlechangeValue}
                  value={interest}
                  endAdornment={
                    <InputAdornment position="start">%</InputAdornment>
                  }
                />
                <input
                  id="slideInterest"
                  min="1"
                  max="30"
                  value={interest}
                  onChange={handlechangeRange}
                  type="range"
                  style={{ width: "80%", flexGrow: 1 }}
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              flexDirection: "column",
              borderRadius: "20%",
              alignItems: "center",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
              marginLeft: "30px",
            }}
          >
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                height: "85%",
                width: "90%",
                padding: "0px 20px",
                // border: "1px solid red",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "2vw",
                  }}
                >
                  Equated monthly installment
                </Typography>
              </Box>
              <Typography
                align="center"
                style={{
                  fontWeight: "800",
                  fontSize: "3vw",
                  color: "rgb(36, 34, 35)",
                  marginTop: "50px",
                  marginBottom: "58px",
                }}
              >
                ₹{monthlyEMI}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  height: "15vh",
                  border: "1px solid gray",
                  borderRadius: "20px",
                  width: "280px",
                  ":hover": {
                    transform: "scale(1.1)",
                    background: "#EEEEEE",
                    transition: "all 300ms ease-in-out",
                  },
                }}
              >
                <Typography sx={{ fontSize: "1vw" }}>Total Payable</Typography>
                <Typography
                  align="center"
                  style={{
                    fontWeight: "bolder",
                    fontSize: "2.2vw",
                    color: "rgb(36, 34, 35)",
                  }}
                >
                  ₹{Math.round(totalpayable)}
                </Typography>
              </Box>
              <Typography
                style={{
                  width: "350px",
                  fontFamily: "cursive",
                  fontSize: "1vw",
                  marginTop: "20px",
                }}
              >
                *Starting at 1% monthly reducing interest rate. Apply now to
                know your exact EMI & interest rate.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default EMICalculator;
