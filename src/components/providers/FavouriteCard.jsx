import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
  Popover,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

import { Utility } from "../utility";
import API from "../../apis";

const StyledCard = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  margin: "0.5rem 0",
  borderRadius: "10px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15)",
  },
  cursor: "pointer",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: "0.875rem",
  padding: "0.5rem 1rem",
  minWidth: "100px",
  background: "linear-gradient(135deg, #2C3CE3 0%, #000DFF 100%)",
  color: "#fff",
  transition: "background-color 0.3s, color 0.3s, transform 0.3s",
  borderRadius: "25px",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    transform: "scale(1.05)",
  },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  position: "relative",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  borderRadius: "50%",
  padding: "4px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
}));

const ProductCard = ({
  title,
  home,
  homeimg,
  interestRate,
  text,
  handleCompareToggle,
  handleRemove,
  isFavourite,
  toggleFavourite,
}) => {
  return (
    <StyledCard>
      <Box sx={{ position: "relative", minWidth: 200, maxWidth: 200 }}>
        <img
          src={homeimg}
          alt={title}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />
      </Box>
      <Box p={2} sx={{ flex: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          color="primary"
          sx={{ fontWeight: "bold", fontSize: "24px", lineHeight: "1.5" }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1, fontSize: "14px" }}
        >
          {text.description}
        </Typography>
        {home && (
          <>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, fontSize: "14px" }}
            >
              {text.short_description}
            </Typography>
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: "bold", fontSize: "24px" }}
            >
              {interestRate}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, fontSize: "14px" }}
            >
              {text.long_description}
            </Typography>
          </>
        )}
        <Box
          mt={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" alignItems="center">
            <StyledButton>
              <Link
                to="/application-form"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Apply Now
              </Link>
            </StyledButton>
            {/* <StyledButton 
              sx={{ backgroundColor: "red", "&:hover": { backgroundColor: "darkred" }, ml: 2 }}
              onClick={handleRemove}
            >
              Remove
            </StyledButton> */}
          </Box>
          {/* <StyledCheckbox
            checked={isFavourite}
            onChange={toggleFavourite}
          /> */}
        </Box>
      </Box>
    </StyledCard>
  );
};

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  home: PropTypes.bool.isRequired,
  homeimg: PropTypes.string.isRequired,
  interestRate: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
  // isFavourite: PropTypes.bool.isRequired,
  // toggleFavourite: PropTypes.func.isRequired,
};

const FavouriteCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [compares, setCompares] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const { getLocalStorage } = Utility();
  const [favoriteItems, setFavoriteItems] = useState([]);

  const open = Boolean(anchorEl);
  const customerId = getLocalStorage("customerInfo")?.id;

  useEffect(() => {
    API.CustomerFavouriteAPI.getFavourites(null, customerId)
      .then(({ data: fav }) => {
        if (fav.status === "Success") {
          console.log("fav", fav.data);
          setFavoriteItems(fav.data);
        } else {
          console.log("Error getting favourites");
        }
      })
      .catch((err) => {
        console.log("Error occurred in getting favourites", err);
      });
  }, [customerId]);

  const handleCompareToggle = async (item) => {
    setCompares((prevCompares) =>
      prevCompares.includes(item)
        ? prevCompares.filter((comp) => comp !== item)
        : [...prevCompares, item]
    );
  };

  const handleProceedToCompare = () => {
    navigate("/providers/Compare", { state: { compares } });
    handlePopoverClose();
  };

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveAll = () => {
    setCompares([]);
    handlePopoverClose();
  };

  const handleRemoveCard = (index) => {
    const updatedFavorites = favoriteItems.filter((_, i) => i !== index);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    window.location.reload();
  };

  return (
    <Container
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        background:
          "linear-gradient(to right, rgba(0, 235, 219, 0.5), rgba(189, 113, 236, 0.5))",
        borderRadius: "0% 100% 0% 1% / 0% 100% 0% 100%",
        padding: "40px",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          marginTop: "20px",
          animation: "bouncee 1s infinite",
          textAlign: "Right",
        }}
      >
        Favourite ❤️ Items!
      </Typography>
      {!favoriteItems.length ? (
        <Typography>No Favorite Items To Display</Typography>
      ) : (
        <Grid container spacing={4}>
          {favoriteItems.map((item, index) => (
            <Grid item xs={12} key={index}>
              <ProductCard
                title={item.title}
                home={item.is_home}
                homeimg={item.home_image}
                interestRate={item.interest_rate}
                text={{
                  description: item.description,
                  short_description: item.short_description,
                  long_description: item.long_description,
                }}
                handleRemove={() => handleRemoveCard(index)}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {compares.length > 0 && (
        <Box sx={{ position: "fixed", right: 4, bottom: 8, zIndex: 999 }}>
          <Button
            onClick={handlePopoverClick}
            sx={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 10)",
              background: "linear-gradient(135deg, #2C3CE3 0%, #000DFF 100%)",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "bold",
              padding: "0.5rem 1rem",
              borderRadius: "25px",
            }}
          >
            Compare
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "bottom", horizontal: "right" }}
            onClose={handlePopoverClose}
          >
            <Box sx={{ p: 2, maxHeight: 700, overflow: "auto" }}>
              {compares.map((product, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}
                >
                  <img
                    src={product.homeimage}
                    alt={product.title}
                    style={{ height: 50, marginRight: 16 }}
                  />
                  <Typography variant="subtitle1">{product.title}</Typography>
                  <IconButton
                    aria-label="remove"
                    size="small"
                    onClick={() => handleCompareToggle(product)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  onClick={handleRemoveAll}
                  variant="outlined"
                  color="error"
                  size="small"
                >
                  Remove All
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleProceedToCompare}
                  sx={{ ml: 2 }}
                >
                  Proceed
                </Button>
              </Box>
            </Box>
          </Popover>
        </Box>
      )}
    </Container>
  );
};

export default FavouriteCard;
