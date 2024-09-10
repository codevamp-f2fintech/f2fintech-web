/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

import { axiosInstance } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const CustomerFavouriteAPI = {
  // create the document in db
  createFavourite: async (customerFavourite, cancel = false) => {
    return await axiosInstance.request({
      url: `/create-favourite`,
      method: "POST",
      data: customerFavourite,
      signal: cancel
        ? cancelApiObject["createFavourite"].handleRequestCancellation().signal
        : undefined,
    });
  },

  // get the document in db
  getFavourites: async (cancel = false) => {
    return await axiosInstance.request({
      url: `/get-favourite`,
      method: "GET",
      signal: cancel
        ? cancelApiObject["getFavourites"].handleRequestCancellation()
          .signal
        : undefined,
    });
  },

  //  API function to handle both adding and removing a favorite
  toggleFavourite: async (customerFavourite, isFavourite, cancel = false) => {
    const url = isFavourite ? '/remove-favourite-by-id/:id' : '/create-favourite';
    const method = isFavourite ? 'GET' : 'POST';

    return await axiosInstance.request({
      url,
      method,
      data: customerFavourite,
      signal: cancel
        ? cancelApiObject[isFavourite ? 'removeFavourite' : 'createFavourite'].handleRequestCancellation().signal
        : undefined,
    });
  },

};

// Defining the cancel API object for CustomerFavouriteAPI
const cancelApiObject = defineCancelApiObject(CustomerFavouriteAPI);
