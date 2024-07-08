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
  IconButton,
  Popover,
  popoverClasses,
} from "@mui/material";
import styled from "@emotion/styled";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
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

const ProductCard = ({
  result,
  cardRef,
  label,
  handleCheckboxChange,
  isChecked,
}) => (
  <Grid item xs={12}>
    <Card
      ref={cardRef}
      sx={{
        display: "flex",
        maxWidth: "100%",
        marginBottom: "20px",
        borderRadius: "10px",
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow:
            "0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardActionArea sx={{ display: "flex", flexDirection: "row" }}>
        <CardMedia
          component="img"
          sx={{
            width: 100,
            height: 100,
            borderRadius: "10px 0 0 10px",
          }}
          image={`/${result.img}`}
          alt={result.title}
        />
        <CardContent
          sx={{
            flex: "1 0 auto",
            paddingLeft: "20px",
          }}
        >
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
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ flexDirection: "column", justifyContent: "center" }}>
        <IconButton
          aria-label="save"
          onClick={() => handleCheckboxChange(result)}
          sx={{
            color: isChecked ? "red" : "default",
            marginBottom: "4px",
          }}
        >
          {isChecked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => handleCheckboxChange(result)}
        >
          Save for Later
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => handleRemove(result)}
          sx={{ mt: 1 }}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  </Grid>
);

export default function Listing() {
  const [filter, setFilter] = useState("interestRate");
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const cardRefs = useRef([]);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [anchorEl, setAnchorEl] = useState(null);

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

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = (product) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((p) => p !== product)
    );
  };

  const handleRemoveAll = () => {
    setSelectedProducts([]);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Grid item xs={12} sm={9} md={12} sx={{ padding: 2 }}>
        <Container maxWidth="lg">
          <Box>
            <Typography variant="h3" gutterBottom></Typography>
            <Box
              sx={{
                position: "fixed",
                right: 16,
                bottom: 8,
                display: selectedProducts.length > 0 ? "block" : "none",
                zIndex: 999, // Ensure it's above other content
              }}
            >
              <Button
                onClick={handlePopoverClick}
                sx={{
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
                variant="contained"
                color="primary"
              >
                Add To Favourite
              </Button>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: "auto",
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                // onClose={handlePopoverClose}
              >
                <Box sx={{ p: 2, maxHeight: 700, overflow: "auto" }}>
                  {selectedProducts.map((product, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      {/* Adjusted image source and content structure */}
                      <img
                        src={`/${product.img}`} // Adjusted image source
                        alt={product.title}
                        style={{ height: 50, marginRight: 16 }}
                      />
                      <Typography variant="subtitle1">
                        {product.title}
                        {/* Include any additional content here */}
                      </Typography>
                      <IconButton
                        aria-label="remove"
                        size="small"
                        onClick={() => handleRemove(product)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  ))}

                  {/* Buttons fixed at the bottom */}
                  <Box sx={{ position: "sticky", bottom: 0, marginTop: 2 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleRemoveAll}
                      onclick={handlePopoverClose}
                      fullWidth
                    >
                      Remove All
                    </Button>
                    {/* <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 1 }}
                      onclick={handlePopoverClose}
                    >
                      Proceed to Compare
                    </Button> */}
                  </Box>
                </Box>
              </Popover>
            </Box>
          </Box>
        </Container>
      </Grid>
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
        </Grid>
      </Box>
      <Advantages advantagesData={advantagesData} />
      <Customers customersdata={customersdata} />
    </>
  );
}
