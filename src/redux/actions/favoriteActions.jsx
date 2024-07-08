export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";

export const addFavorite = (item) => ({
  type: ADD_FAVORITE,
  payload: item,
});

export const removeFavorite = (item) => ({
  type: REMOVE_FAVORITE,
  payload: item,
});
