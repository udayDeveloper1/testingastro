import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "https://pyapi.ipotrending.com/",
  // baseURL: "https://a9dd-2401-4900-1c80-2207-90af-8dbd-4e86-aea3.ngrok-free.app/",
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Retrieve token

    if (token) {
      config.headers = {
        ...config.headers, // Keep existing headers
        Authorization: `Bearer ${token}`, // Add token if available
      };
    } else {
      console.warn("No auth token provided. Request sent without authentication.");
    }

    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error;
    if (response) {
      const { status } = response;

      
      // Check if the status is not 200 or 201
      if (status !== 200 || status !== 201) {
        
      }else{

      }
    
      // Handle specific status codes
      switch (status) {
        case 401:
          console.warn('Unauthorized access.');
          break;
        case 403:
          console.warn('Forbidden access.');
          break;
        case 500:
          console.error('Server error.');
          break;
        default:
          console.error(`Unhandled error status: ${status}`);
      }
    } else {
      console.error('No response received.');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
