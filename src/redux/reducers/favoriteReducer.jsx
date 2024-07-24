/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

import { ActionTypes } from "../constants/action-types";

const initialState = {
  favorites: [],
};

export const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case ActionTypes.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((item) => item !== action.payload),
      };
    default:
      return state;
  }
};
