/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

import { combineReducers } from "redux";
import favoriteReducer from "./favoriteReducer";
import { setLoanProvidersReducer } from "./LoanProviderReducer";

const rootReducers = combineReducers({
  allLoanProviders: setLoanProvidersReducer,
  favorites: favoriteReducer,
});

export default rootReducers;
