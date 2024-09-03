import { axiosInstance } from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const CustomerApplicationAPI = {
    // Function to create a loan application with amount and tenure
    createLoanApplication: async (data, cancel = false) => {
      try {
        const response = await axiosInstance.request({
          url: `/create-loanapplication`,  // Corrected endpoint to match your backend route
          method: "POST",
          data: data,  // Data containing amount and tenure
          signal: cancel
            ? cancelApiObject[this.createLoanApplication.name].handleRequestCancellation().signal
            : undefined,
        });
        return response;
      } catch (error) {
        console.error('Error during loan application creation:', error.message || error);
        throw error;
      }
    },
  
    getCustomerDocuments: async (cancel = false) => {
      try {
        const response = await axiosInstance.request({
          url: `/get-loanapplication`,
          method: "GET",
          signal: cancel
            ? cancelApiObject[this.getCustomerDocuments.name].handleRequestCancellation().signal
            : undefined,
        });
        return response;
      } catch (error) {
        console.error('Error retrieving customer documents:', error.message || error);
        throw error;
      }
    },
  };
  
  const cancelApiObject = defineCancelApiObject(CustomerApplicationAPI);
