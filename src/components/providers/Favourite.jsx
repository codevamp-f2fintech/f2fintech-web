import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoanProviders } from "../../redux/actions/LoanProviderAction";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  IconButton,
  Popover,
} from "@mui/material";
import PropTypes from "prop-types";
import API from "../../apis";
import ButtonComp from "../common/button/Button";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import styled from "@emotion/styled";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: 2,
  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15)",
  },
}));

function ProductCard({
  title,
  home,
  homeimg,
  interestRate,
  text,
  isFavorite,
  handleFavoriteToggle,
}) {
  return (
    <StyledCard>
      <Box sx={{ position: "relative" }}>
        <CardMedia component="img" height="140" image={homeimg} alt={title} />
        <Checkbox
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite sx={{ color: "red" }} />}
          checked={isFavorite}
          onChange={handleFavoriteToggle}
          sx={{ position: "absolute", top: 16, right: 16 }}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text.description}
        </Typography>
        {home && (
          <>
            <Typography variant="body2" color="text.secondary">
              {text.short_description}
            </Typography>
            <Typography variant="h6" color="primary">
              {interestRate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {text.long_description}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        <ButtonComp title="Calculate Returns" width="190px" />
      </CardActions>
    </StyledCard>
  );
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  home: PropTypes.bool.isRequired,
  homeimg: PropTypes.string.isRequired,
  interestRate: PropTypes.string.isRequired,
  text: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  handleFavoriteToggle: PropTypes.func.isRequired,
};

const Filter = ({ filter, setFilter }) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "flex-end", borderRadius: "10px" }}
    >
      <FormControl fullWidth sx={{ width: "15%", borderRadius: "15px" }}>
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

export default function Favourite() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("interestRate");
  const [favorites, setFavorites] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const loanProviders = useSelector((state) => state.allLoanProviders);

  useEffect(() => {
    API.LoanProviderAPI.getAll()
      .then((response) => {
        if (response.data.status === "Success") {
          dispatch(
            setLoanProviders({
              listData: response.data.data.rows,
            })
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error, "loanproviderapierror");
        setLoading(false);
      });
  }, [dispatch]);

  const handleFavoriteToggle = (item) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(item)
        ? prevFavorites.filter((fav) => fav !== item)
        : [...prevFavorites, item]
    );
  };

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveAll = () => {
    setFavorites([]);
    handlePopoverClose();
  };

  const open = Boolean(anchorEl);

  const getFilteredData = () => {
    let sortedData = [...(loanProviders?.listData || [])];
    if (filter === "interestRate") {
      sortedData.sort((a, b) => a.interestRate - b.interestRate);
    } else if (filter === "rating") {
      sortedData.sort((a, b) => b.rating - a.rating);
    }
    return sortedData;
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Loan Providers
      </Typography>
      <Filter filter={filter} setFilter={setFilter} />
      <Grid container spacing={4}>
        {getFilteredData().map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
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
              isFavorite={favorites.includes(item)}
              handleFavoriteToggle={() => handleFavoriteToggle(item)}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ position: "fixed", right: 16, bottom: 8, zIndex: 999 }}>
        <Button
          onClick={handlePopoverClick}
          sx={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            background: "linear-gradient(135deg, #2c3ce3 0%, #000DFF 100%)",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "bold",
            padding: "0.25rem 0.5rem",
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
            {favorites.map((product, index) => (
              <Box
                key={index}
                sx={{ display: "flex", alignItems: "center", mb: 2 }}
              >
                <img
                  src={product.homeimg}
                  alt={product.title}
                  style={{ height: 50, marginRight: 16 }}
                />
                <Typography variant="subtitle1">{product.title}</Typography>
                <IconButton
                  aria-label="remove"
                  size="small"
                  onClick={() => handleFavoriteToggle(product)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
            <Box
              sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handlePopoverClose}
              >
                Proceed to Compare
              </Button>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleRemoveAll}
              >
                Remove All
              </Button>
            </Box>
          </Box>
        </Popover>
      </Box>
    </Container>
  );
}
