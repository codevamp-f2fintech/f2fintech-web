import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Popover,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ListItemIcon from '@mui/icons-material/CheckCircle';
import styled from "@emotion/styled";
import PropTypes from "prop-types";

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
  background: "linear-gradient(135deg, #2c3ce3 0%, #000DFF 100%)",
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
  position: "absolute",
  top: 8,
  right: 8,
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
  isCompared,
  handleCompareToggle,
  onCardClick,
  handleCheckboxChange,
  handleRemove,
}) => {
  return (
    <StyledCard>
      <Box sx={{ position: "relative", minWidth: 200, maxWidth: 200 }}>
        <img
          src={homeimg}
          alt={title}
          style={{ height: "100%", width: "100%", objectFit: "cover", borderRadius: "5px" }}
        />
      </Box>
      <Box p={2} sx={{ flex: 1 }}>
        <Typography gutterBottom variant="h6" color="primary" sx={{ fontWeight: "bold", fontSize: "24px", lineHeight: "1.5" }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: "14px" }}>
          {text.description}
        </Typography>
        {home && (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: "14px" }}>
              {text.short_description}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ fontWeight: "bold", fontSize: "24px" }}>
              {interestRate}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontSize: "14px" }}>
              {text.long_description}
            </Typography>
          </>
        )}
        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          <StyledButton onClick={() => console.log("Apply Now clicked!")}>
            Apply Now
          </StyledButton>
          <Box mt={2} display="flex" justifyContent="space-between" alignItems="center" marginRight="500px" marginBottom="15px">
            <StyledButton onClick={handleRemove} sx={{ backgroundColor: "red", "&:hover": { backgroundColor: "darkred" } }}>
          Remove
       </StyledButton>
       </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={isCompared}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label="Add to Compare"
          />     
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
  isCompared: PropTypes.bool.isRequired,
  handleCompareToggle: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

const Filter = ({ filter, setFilter }) => (
  <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
    <FormControl fullWidth sx={{ width: "15%" }}>
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

const FavouriteCard = () => {
  const location = useLocation();
  const [compares, setCompares] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState("");


  const favoriteItems = JSON.parse(localStorage.getItem("favorites")) || [];

  const handleCompareToggle = (product) => {
    setCompares((prev) =>
      prev.includes(product)
        ? prev.filter((item) => item !== product)
        : [...prev, product]
    );
  };

  const handleCheckboxChange = (product) => (event) => {
    if (event.target.checked) {
      setCompares((prev) => [...prev, product]);
    } else {
      setCompares((prev) => prev.filter((item) => item !== product));
    }
  };

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveAll = () => {
    setCompares([]);
  };

  const handleRemoveCard = (index) => {
    const updatedFavorites = favoriteItems.filter((_, i) => i !== index);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    window.location.reload(); // Reload to update the displayed list
  };

  const open = Boolean(anchorEl);

  return (
    <Container
      style={{
        backgroundSize: "cover",
        backgroundPosition: "centre",
        background:
          "linear-gradient(to right, rgba(0, 235, 219, 0.5), rgba(189, 113, 236, 0.5))",
        borderRadius: "0% 100% 0% 1% / 0% 100% 0% 100%",
        padding: "40px",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ marginTop: "20px", animation: "bounce 1s infinite", marginLeft: "900px" }}>
        Favourite ❤️ Items!
      </Typography>
      {favoriteItems.length === 0 ? (
        <Typography>No favorite items to display.</Typography>
      ) : (
        <Grid container spacing={4}>
          {favoriteItems.map((item, index) => (
            <Grid item xs={12} key={index}>
              <ProductCard
                title={item.title}
                home={item.home}
                homeimg={item.homeimage}
                interestRate={item.interest_rate}
                text={{
                  description: item.description,
                  short_description: item.short_description,
                  long_description: item.long_description,
                }}
                isCompared={compares.includes(item)}
                handleCompareToggle={() => handleCompareToggle(item)}
                onCardClick={() => {}}
                handleCheckboxChange={handleCheckboxChange(item)}
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
              background: "linear-gradient(135deg, #2c3ce3 0%, #000DFF 100%)",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "bold",
              padding: "0.5rem 1rem",
              borderRadius: "25px",
            }}
          >
            Compare {compares.length}
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
              </Box>
            </Box>
          </Popover>
        </Box>
      )}
    </Container>
  );
};

export default FavouriteCard;
