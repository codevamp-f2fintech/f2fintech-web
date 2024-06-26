/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import rootReducers from "./reducers";

const store = createStore(rootReducers, {}, applyMiddleware(thunk));

export default store;
