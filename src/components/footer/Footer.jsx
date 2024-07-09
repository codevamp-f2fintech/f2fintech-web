import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

import { pages, products } from "../../data/Data";
const Footer = () => {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <Container
      maxWidth="false"
      sx={{
        background:
          "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(6,55,158,1) 100%)",
        height: "100%",
        textDecoration: "none",
        paddingBottom: "60px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "60px 60px 30px",
        }}
      >
        <Box width={350} alignItems="center" sx={{ textDecoration: "none" }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: "800",
              color: "white",
              marginBottom: "1rem",
              textDecoration: "none",
              fontSize: "3.3vw",
            }}
          >
            <Link
              to="/"
              variant="h6"
              style={{
                color: "white",
                marginBottom: "1rem",
                textDecoration: "none",
              }}
              onClick={topFunction}
            >
              f2fintech
            </Link>
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: "white",
              lineHeight: "3rem",
              textDecoration: "none",
              fontSize: "1.1vw",
            }}
          >
            f2fintech Pvt Ltd, A-25, M-1 Arv Park, A-Block, Sector 63, Noida
            +918810600135
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textDecoration: "none",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "600",
              color: "white",
              marginBottom: "1rem",
              textDecoration: "none",
              fontSize: "2vw",
            }}
          >
            Company
          </Typography>
          <Typography
            variant="h3"
            sx={{ lineHeight: "3rem", fontSize: "1.1vw" }}
          >
            <Link
              style={{
                color: "white",
                marginBottom: "1rem",
                underline: "none",
                textDecoration: "none",
              }}
              onClick={topFunction}
            >
              About us
            </Link>
          </Typography>
          <Typography
            variant="h3"
            sx={{ lineHeight: "3rem", fontSize: "1.1vw" }}
          >
            <Link
              to="/blogs"
              variant="h6"
              style={{
                color: "white",
                marginBottom: "1rem",
                underline: "none",
                textDecoration: "none",
              }}
              onClick={topFunction}
            >
              Blogs
            </Link>
          </Typography>
          <Typography
            variant="h3"
            sx={{ lineHeight: "3rem", fontSize: "1.1vw" }}
          >
            <Link
              variant="h6"
              style={{
                color: "white",
                marginBottom: "1rem",
                textDecoration: "none",
              }}
              onClick={topFunction}
            >
              Privacy Policy
            </Link>
          </Typography>
          <Typography
            variant="h3"
            sx={{ lineHeight: "3rem", fontSize: "1.1vw" }}
          >
            <Link
              variant="h6"
              style={{
                color: "white",
                marginBottom: "1rem",
                textDecoration: "none",
              }}
              onClick={topFunction}
            >
              Term & Condition
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textDecoration: "none",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "600",
              color: "white",
              marginBottom: "1rem",
              textDecoration: "none",
              fontSize: "2vw",
            }}
          >
            Products
          </Typography>
          <Typography
            variant="h3"
            sx={{ lineHeight: "3rem", fontSize: "1.1vw" }}
          >
            <Link
              to="/businessLoan"
              variant="h6"
              style={{
                color: "white",
                marginBottom: "1rem",
                textDecoration: "none",
              }}
              onClick={topFunction}
            >
              Business Loan
            </Link>
          </Typography>
          <Typography
            variant="h3"
            sx={{ lineHeight: "3rem", fontSize: "1.1vw" }}
          >
            <Link
              to="/msmeLoan"
              variant="h6"
              style={{
                color: "white",
                marginBottom: "1rem",
                textDecoration: "none",
              }}
              onClick={topFunction}
            >
              MSME Loan
            </Link>
          </Typography>
          <Typography
            variant="h3"
            sx={{ lineHeight: "3rem", fontSize: "1.1vw" }}
          >
            <Link
              to="/smallBusinessLoan"
              variant="h6"
              style={{
                color: "white",
                marginBottom: "1rem",
                textDecoration: "none",
              }}
              onClick={topFunction}
            >
              Small Business Loan
            </Link>
          </Typography>
          <Typography
            variant="h3"
            sx={{ lineHeight: "3rem", fontSize: "1.1vw" }}
          >
            <Link
              to="/unsecuredLoan"
              variant="h6"
              style={{
                color: "white",
                marginBottom: "1rem",
                underline: "none",
                textDecoration: "none",
              }}
              onClick={topFunction}
            >
              Unsecured Business Loan
            </Link>
          </Typography>
          <Typography
            variant="h3"
            sx={{ lineHeight: "3rem", fontSize: "1.1vw" }}
          >
            <Link
              to="/businessLoanForWomen"
              style={{
                color: "white",
                marginBottom: "1rem",
                fontSize: "16px",
                textDecoration: "none",
              }}
              onClick={topFunction}
            >
              Business Loan For Women
            </Link>
          </Typography>
          <Typography
            variant="h3"
            sx={{ lineHeight: "3rem", fontSize: "1.1vw" }}
          >
            <Link
              to="/eCommerceBusinessLoan"
              style={{
                color: "white",
                marginBottom: "1rem",
                fontSize: "16px",
                textDecoration: "none",
              }}
              onClick={topFunction}
            >
              E-Commerce Business Loan
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textDecoration: "none",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "600",
              color: "white",
              marginBottom: "1rem",
              textDecoration: "none",
              fontSize: "2vw",
            }}
          >
            Let's Talk
          </Typography>
          <Typography
            variant="h3"
            sx={{ lineHeight: "3rem", fontSize: "1.1vw" }}
          >
            <Link
              variant="h6"
              style={{
                color: "white",
                marginBottom: "1rem",
                textDecoration: "none",
              }}
              onClick={topFunction}
            >
              Have any doubts?
            </Link>
          </Typography>
          <Typography
            variant="h3"
            sx={{ lineHeight: "3rem", fontSize: "1.1vw" }}
          >
            <Link
              variant="h6"
              style={{
                color: "white",
                marginBottom: "1rem",
                textDecoration: "none",
              }}
              onClick={topFunction}
            >
              Contact Us
            </Link>
          </Typography>
          <Stack direction="row" spacing={3}>
            <FacebookOutlinedIcon />
            <YouTubeIcon />
            <InstagramIcon />
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "30vh",
          padding: "0px 60px 30px",
        }}
      >
        <Typography
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "1.1vw",
          }}
        >
          © 2024 All Rights Reserved by f2fintech
        </Typography>
        <Divider
          color="white"
          sx={{
            height: "2px",
            textDecoration: "none",
          }}
        />
        <Typography
          style={{
            color: "white",
            fontSize: "1vw",
            textDecoration: "none",
          }}
        >
          f2fintech is a platform that connects businesses with lending options
          offered by RBI-licensed NBFC partners. The loans offered on the
          platform are subject to the terms and conditions and loan approval
          process of the NBFC partners
        </Typography>
      </Box>
    </Container>
  );
};
export default Footer;
