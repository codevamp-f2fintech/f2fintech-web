import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://localhost:8080/api/v1`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("API ERRORR", error);
    let res = error.response;
    if (res.status == 401) {
      alert(res.data.msg);
    }
    console.error("Looks like there was a problem. Status Code: " + res.status);
    return Promise.reject(error);
  }
);

export default axiosClient;
