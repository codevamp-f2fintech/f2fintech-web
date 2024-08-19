/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

import { axiosInstance } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const DocumentAPI = {
 
  // create the document in db
  createDocument: async (document, cancel = false) => {
    console.log("createDocument called with:", document);
    return await axiosInstance.request({
      url: `/create-document`,
      method: "POST",
      data: document,
      signal: cancel
        ? cancelApiObject[this.createDocument.name].handleRequestCancellation().signal
        : undefined,
      }).then(response => {
        console.log("createDocument response:", response);
        return response;
      }).catch(error => {
        console.error("createDocument error:", error);
        throw error;
      });
  },
 
  // upload the image to nodejs
  uploadDocument: async (document, cancel = false) => {
    return await axiosInstance.request({
      url: `/upload-to-s3`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      data: document,
      signal: cancel
        ? cancelApiObject[this.uploadDocument.name].handleRequestCancellation().signal
        : undefined,
      }).then(response => {
        console.log("uploadDocument response:", response);
        return response;
      }).catch(error => {
        console.error("uploadDocument error:", error);
        throw error;
    });
  }
};

// Defining the cancel API object for DocumentAPI
const cancelApiObject = defineCancelApiObject(DocumentAPI);
