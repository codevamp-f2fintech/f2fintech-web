import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setLoanProviders } from "../../redux/actions/LoanProviderAction";
import API from "../../apis";
// import ProductCard from "./ProductCard";
import {
  addFavorite,
  removeFavorite,
} from "../../redux/actions/favoriteActions";

const FavouritePage = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const loanProviders = useSelector((state) => state.allLoanProviders.listData);
  const favoriteItems = useSelector((state) => state.favorites.favorites);

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
    if (favoriteItems.includes(item)) {
      dispatch(removeFavorite(item));
    } else {
      dispatch(addFavorite(item));
    }
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
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Favorite Items
      </Typography>
      <Grid container spacing={4}>
        {favoriteItems.length > 0 ? (
          favoriteItems.map((item, index) => (
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
                isFavorite={favoriteItems.includes(item)}
                handleFavoriteToggle={() => handleFavoriteToggle(item)}
                isCompared={false}
                handleCompareToggle={() => {}}
              />
            </Grid>
          ))
        ) : (
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Typography variant="body1" color="text.secondary">
              No favorite items found.
            </Typography>
          </Box>
        )}
      </Grid>
    </Container>
  );
};

export default FavouritePage;
