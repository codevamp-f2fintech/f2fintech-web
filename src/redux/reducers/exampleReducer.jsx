/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

import { ActionTypes } from "../constants/action-types";

const initialState = {
  listData: [],
};

export const setExampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes:
      return {
        ...state,
        listData: action.payload.listData,
      };
    default:
      return state;
  }
};
