import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import ProductCard from "../favourite/ProductCard";

const FavoriteList = ({ favorites, handleFavoriteToggle }) => (
  <Box sx={{ marginTop: 4 }}>
    <Typography variant="h5" sx={{ marginBottom: 2 }}>
      Favorite Items
    </Typography>
    <Grid container spacing={4}>
      {favorites.map((item, index) => (
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
            isFavorite={true}
            handleFavoriteToggle={() => handleFavoriteToggle(item)}
            isCompared={false}
            handleCompareToggle={() => {}}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default FavoriteList;
