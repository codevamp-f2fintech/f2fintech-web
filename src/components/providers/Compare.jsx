import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
  CardMedia,
} from "@mui/material";
import { useLocation } from "react-router-dom"; // Import useLocation from react-router-dom

function Compare() {
  const location = useLocation(); // Use useLocation to get the state
  const { compares } = location.state; // Retrieve the compares array from state
  const [hoveredPair, setHoveredPair] = useState(null);

  const handleMouseEnter = (pair) => {
    setHoveredPair(pair);
  };

  const handleMouseLeave = () => {
    setHoveredPair(null);
  };

  return (
    <Container
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        background:
          "linear-gradient(to right, rgba(0, 235, 219, 0.5), rgba(189, 113, 236, 0.5))",
        borderRadius: "0% 100% 0% 100% / 0% 100% 0% 100%",
        padding: "40px",
      }}
    >
      <Box my={4}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ fontWeight: "bold", color: "#1d29d8" }}
        >
          Loan Provider Comparison
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {compares.map((product, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              style={{
                position: "relative",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                overflow: "hidden",
                backgroundColor: "rgba(255, 255, 255, 1)", // Opaque background
                color: "black",
                padding: "16px",
                transform: hoveredPair === index ? "scale(1.05)" : "scale(1)",
                boxShadow: hoveredPair === index ? "0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15)" : "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.homeimage}
                alt={product.title}
                style={{ objectFit: "contain", padding: "16px" }}
              />
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  style={{ fontWeight: "bold", color: "blue" }}
                >
                  {product.title}
                </Typography>
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="body2"
                    gutterBottom
                    style={{ fontWeight: "normal", color: "black" }}
                    sx={{ marginLeft: 1 }}
                  >
                    <strong>ROI:</strong> {product.interest_rate}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="body2"
                    gutterBottom
                    style={{ fontWeight: "normal", color: "black" }}
                    sx={{ marginLeft: 1 }}
                  >
                    <strong>Description:</strong> {product.description}
                  </Typography>
                </Box>
              </CardContent>
              <CardContent>
                <Divider style={{ margin: "20px 0" }} />
                <Box display="flex" alignItems="center">
                  <Typography variant="body2" sx={{ marginLeft: 1 }}>
                    <strong>Charges:</strong> {product.charges}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography variant="body2" sx={{ marginLeft: 1 }}>
                    <strong>Minimum KYC:</strong> {product.minimum_kyc}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography variant="body2" sx={{ marginLeft: 1 }}>
                    <strong>Document Required:</strong> {product.document_required}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="body2"
                    gutterBottom
                    style={{ fontWeight: "normal", color: "black" }}
                    sx={{ marginLeft: 1 }}
                  >
                    <strong>Short_description:</strong> {product.short_description}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Typography
                    variant="body2"
                    gutterBottom
                    style={{ fontWeight: "normal", color: "black" }}
                    sx={{ marginLeft: 1 }}
                  >
                    <strong>Long_description:</strong> {product.long_description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Compare;
