import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  CardActions,
  Button,
  Box,
  Paper,
  Checkbox,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Rating,
  FormControlLabel,
} from "@mui/material";

import styled from "@emotion/styled";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Data from "../data/Data.json";
import Advantages from "../../components/advantages/Advantages";
import { advantagesData } from "../data/Data.jsx";
import { customersdata } from "../../components/data/data";
import Customers from "../customers/Customers";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Filter = ({ filter, setFilter }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        borderRadius: "10px",
      }}
    >
      <FormControl
        fullWidth
        sx={{
          width: "15%",
          borderRadius: "15px",
        }}
      >
        <InputLabel id="filter-label">Sort By</InputLabel>
        <Select
          labelId="filter-label"
          value={filter}
          label="Filter by"
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="interestRate">Interest Rate</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="popular">Popular Banks</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

const ProductCard = ({ result, cardRef, label, handleCheckboxChange, isChecked }) => (
  <Grid item xs={12} sm={6} md={4} ref={cardRef}>
    <Card
      sx={{
        maxWidth: 545,
        marginBottom: "30px",
        borderRadius: "20px",
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        overflow: "hidden",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow:
            "0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardActionArea>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="200"
            image={`/${result.img}`} 
            alt={result.title}
            sx={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          />
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
            sx={{ position: "absolute", top: 16, right: 16 }}
          />
        </Box>

        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontWeight: "bold", fontSize: "18px" }}
          >
            {result.title}
          </Typography>
          <Rating
            name="half-rating"
            sx={{
              color: "secondary",
            }}
            value={result.rating}
            precision={0.5}
          />
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ marginBottom: "8px", fontSize: "15px", color: "blue" }}
          >
            Starting at {result.price}
          </Typography>

          <ul
            style={{
              paddingLeft: "20px",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            {result.features.map((feature, idx) => (
              <li
                key={idx}
                style={{
                  listStyleType: "disc",
                  marginBottom: "8px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                <Typography variant="body2" color="black">
                  {feature}
                </Typography>
              </li>
            ))}
          </ul>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <FormControlLabel
          control={
            <Checkbox
              {...label}
              checked={isChecked}
              onChange={() => handleCheckboxChange(result)}
              sx={{
                '&.Mui-checked': {
                  color: 'green',
                },
              }}
            />
          }
          label="Add to Compare"
          sx={{ zIndex: 10 }}
        />
        <Button
          size="small"
          variant="contained"
          fullWidth
          sx={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            background: "rgba(6,55,158,1)",
            marginBottom: "5px",
          }}
        >
          Apply Now
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            background: "blue",
            marginBottom: "5px",
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  </Grid>
);

export default function Comparison() {
  const [filter, setFilter] = useState("interestRate");
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const cardRefs = useRef([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCheckboxChange = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(product)) {
        return prevSelectedProducts.filter((p) => p !== product);
      } else {
        return [...prevSelectedProducts, product];
      }
    });
  };

  const getFilteredData = () => {
    let sortedData = [...Data];
    if (filter === "interestRate") {
      sortedData.sort((a, b) => a.interestRate - b.interestRate);
    } else if (filter === "rating") {
      sortedData.sort((a, b) => b.rating - a.rating);
    }
    return sortedData.slice(0, 9);
  };

  const filteredData = getFilteredData();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9} md={12} sx={{ padding: 2 }}>
            <Container maxWidth="lg">
              <Filter filter={filter} setFilter={setFilter} />
              <Grid
                container
                spacing={5}
                sx={{
                  marginTop: 2,
                  padding: 5,
                  borderRadius: 2,
                  background:
                    "linear-gradient(to right, rgba(0, 235, 219, 0.5), rgba(189, 113, 236, 0.5))",
                  borderRadius: "0% 100% 0% 100% / 0% 100% 0% 100%",
                }}
              >
                {loading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100vh",
                      width: "100%",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  filteredData.map((result, index) => (
                    <ProductCard
                      key={index}
                      result={result}
                      cardRef={(el) => (cardRefs.current[index] = el)}
                      label={label}
                      handleCheckboxChange={handleCheckboxChange}
                      isChecked={selectedProducts.includes(result)}
                    />
                  ))
                )}
              </Grid>
            </Container>
          </Grid>
          <Grid item xs={12} sm={9} md={12} sx={{ padding: 2 }}>
            <Container maxWidth="lg">
              <Box
                sx={{
                  marginTop: 2,
                  padding: 5,
                  borderRadius: 2,
                  background:
                    "linear-gradient(to right, rgba(0, 235, 219, 0.5), rgba(189, 113, 236, 0.5))",
                  borderRadius: "0% 100% 0% 100% / 0% 100% 0% 100%",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Selected Products for Comparison
                </Typography>
                {selectedProducts.length > 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    {selectedProducts.map((product, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          padding: 2,
                          backgroundColor: "white",
                          borderRadius: 2,
                          boxShadow: 1,
                        }}
                      >
                        <Typography variant="h6">{product.title}</Typography>
                        <Typography variant="body2">
                          Interest Rate: {product.interestRate}
                        </Typography>
                        <Typography variant="body2">Rating: {product.rating}</Typography>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          sx={{ mt: 1 }}
                          onClick={() => handleCheckboxChange(product)}
                        >
                          Remove
                        </Button>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body1">No products selected</Typography>
                )}
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Box>
      <Advantages advantagesData={advantagesData} />
      <Customers customersdata={customersdata} />
    </>
  );
}
