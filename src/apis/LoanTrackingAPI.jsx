/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

import { axiosInstance } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const LoanTrackingAPI = {

  createLoanTracking: async (createLoanTracking, cancel = false) => {
    return await axiosInstance.request({
      url: `/create-loan-tracking`,
      method: "POST",
      data: createLoanTracking,
      signal: cancel
        ? cancelApiObject[this.createLoanTracking.name].handleRequestCancellation().signal
        : undefined,
    });
  },

  getLoanTracking: async (cancel = false) => {
    return await axiosInstance.request({
      url: `/get-loan-tracking`,
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.getLoanTracking.name].handleRequestCancellation().signal
        : undefined,
    });
  }
};

// Defining the cancel API object for LoanTrackingAPI
const cancelApiObject = defineCancelApiObject(LoanTrackingAPI);
