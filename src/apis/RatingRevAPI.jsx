/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

import { axiosInstance } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const RatingRevAPI = {
  createRating: async (ratingData, cancel = false) => {
    return await axiosInstance.request({
      url: `/create-customer-review`,
      method: "POST",
      data: ratingData,
      signal: cancel
        ? cancelApiObject[
            this.createLoanTracking.name
          ].handleRequestCancellation().signal
        : undefined,
    });
  },

  getRating: async (cancel = false) => {
    return await axiosInstance.request({
      url: `/get-customer-review`,
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.getRating.name].handleRequestCancellation()
            .signal
        : undefined,
    });
  },
};

// Defining the cancel API object for RatingAPI
const cancelApiObject = defineCancelApiObject(RatingRevAPI);
