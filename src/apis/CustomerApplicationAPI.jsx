import { axiosInstance } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const CustomerApplicationAPI = {
    // Function to create a loan application with amount and tenure
    createApplication: async (document, cancel = false) => {
      return await axiosInstance.request({
        url: `/create-application`,
        method: "POST",
        data: document,
        signal: cancel
          ? cancelApiObject[this.createApplication.name].handleRequestCancellation().signal
          : undefined,
      });
    },
  
   // Function to get Applications from the DB
    getApplications: async (cancel = false) => {
      return await axiosInstance.request({
        url: `/get-applications`,
        method: "GET",
        signal: cancel
          ? cancelApiObject[this.getApplications.name].handleRequestCancellation().signal
          : undefined,
      });
    }
  };
  
  const cancelApiObject = defineCancelApiObject(CustomerApplicationAPI);
