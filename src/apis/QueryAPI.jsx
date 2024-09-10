/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

import { axiosInstance } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const QueryAPI = {
  create: async (data, cancel = false) => {
    return await axiosInstance.request({
      url: `/create-query`,
      method: "POST",
      data: data,
      signal: cancel
        ? cancelApiObject[this.data.name].handleRequestCancellation().signal
        : undefined,
    });
  },

  get: async (limit, offset, customer_id, cancel = false) => {
    return await axiosInstance.request({
      url: `/get-query`,
      method: "GET",
      params: { customer_id: customer_id, limit: limit, offset: offset },
      signal: cancel
        ? cancelApiObject[this.getLoanTracking.name].handleRequestCancellation()
            .signal
        : undefined,
    });
  },
};

// Defining the cancel API object for LoanTrackingAPI
const cancelApiObject = defineCancelApiObject(QueryAPI);
