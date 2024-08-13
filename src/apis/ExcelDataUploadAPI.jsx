/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

import { axiosInstance } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const ExcelDataUploadAPI = {
  /** Upload Excel file to import loan providers' data
   */
  uploadFile: async (fileData, cancel = false) => {
    const formData = new FormData();
    formData.append("file", fileData);

    return await axiosInstance.request({
      url: `/import-loan-providers`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      signal: cancel
        ? cancelApiObject[this.uploadFile.name].handleRequestCancellation().signal
        : undefined,
    });
  },
};

// defining the cancel API object for ExcelDataUploadAPI
const cancelApiObject = defineCancelApiObject(ExcelDataUploadAPI);
