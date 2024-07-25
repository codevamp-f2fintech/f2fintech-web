/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

import { ActionTypes } from "../constants/action-types";

export const addFavorite = (item) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: item,
});

export const removeFavorite = (item) => ({
  type: ActionTypes.REMOVE_FAVORITE,
  payload: item,
});
