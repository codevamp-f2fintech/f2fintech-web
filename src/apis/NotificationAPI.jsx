/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

import { axiosInstance } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const NotificationAPI = {

  createNotification: async (value, cancel = false) => {
    return await axiosInstance.request({
      url: `/create-notification`,
      method: "POST",
      data: value,
      signal: cancel
        ? cancelApiObject[this.createNotification.name].handleRequestCancellation().signal
        : undefined,
    });
  },

  getNotification: async (id, cancel = false) => {
    return await axiosInstance.request({
      url: `/get-notifications/${id}`,
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.getNotification.name].handleRequestCancellation().signal
        : undefined,
    });
  },

  markAsRead: async (id, cancel = false) => {
    return await axiosInstance.request({
      url: `/mark-notification-read/${id}`,
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.markAsRead.name].handleRequestCancellation().signal
        : undefined,
    });
  },

  markAllAsRead: async (userId, cancel = false) => {
    return await axiosInstance.request({
      url: `/mark-all-notifications-read/${userId}`,
      method: "GET",
      signal: cancel
        ? cancelApiObject[this.markAllAsRead.name].handleRequestCancellation().signal
        : undefined,
    });
  },
};

// Defining the cancel API object for NotificationAPI
const cancelApiObject = defineCancelApiObject(NotificationAPI);
