// import axios from 'axios';

// import { Constatnt } from '../utils/Constent';
// import { logoutRedirection, ManageTokan } from '../utils/CommonFunction';
// import { Codes } from '../utils/CommonVariable';
// // import { Decryption } from '../utils/CommonFunction';

// const AxiosClientApi = axios.create({
//     baseURL: Constatnt.API_BASE_URL,
// });

// // request AxiosClient
// AxiosClientApi.interceptors.request.use(function (request) {

//     request.headers['token'] = localStorage.getItem(Constatnt?.ACCESS_TOKEN_KEY) || '-';
//     request.headers['accept-language'] = localStorage.getItem(Constatnt.LANGUAGE_KEY) || Constatnt.LANGUAGE;
//     request.headers['role'] = Constatnt.ROLE;
//     request.headers['api-key'] = Constatnt.API_KEY;
//     request.headers['content-type'] = Constatnt.CONTENT_TYPE;
//     request.headers['is_encript'] = false;
//     return request;
// });

// // Response AxiosClient
// AxiosClientApi.interceptors.response.use(
//     function (response) {
//         console.log('response33333333333333333333', response);

//         if (response?.data?.code === Codes?.USER_SESSION_EXPIRE) {
//             console.log("zzzzzzzzzz");
//             ManageTokan();
//         }
//         return response.data;
//     },
//     function (error) {
//         if (error?.response?.status === 401) {
//             console.log("zzzzzzzzzz");

//             logoutRedirection();
//         }
//         return Promise.reject(error); // Ensure the error is passed to the caller
//     }
// );

// export default AxiosClientApi;


import axios from 'axios';
import { Constatnt } from '../utils/Constent';
import {
  logoutRedirection,
  ManageTokan
} from '../utils/CommonFunction';
import { Codes } from '../utils/CommonVariable';

// Create Axios instance
const AxiosClientApi = axios.create({
  baseURL: Constatnt.API_BASE_URL,
});

// Request Interceptor
AxiosClientApi.interceptors.request.use(request => {
  request.headers['token'] = localStorage.getItem(Constatnt.ACCESS_TOKEN_KEY) || '-';
  request.headers['accept-language'] = localStorage.getItem(Constatnt.LANGUAGE_KEY) || Constatnt.LANGUAGE;
  request.headers['role'] = Constatnt.ROLE;
  request.headers['api-key'] = Constatnt.API_KEY;
  request.headers['content-type'] = Constatnt.CONTENT_TYPE;
  request.headers['is_encript'] = false;
  return request;
});

// Response Interceptor
AxiosClientApi.interceptors.response.use(
  async response => {
    const resData = response?.data;

    // ✅ Token expired based on response code (not HTTP error)
    if (resData?.code === Codes.USER_SESSION_EXPIRE || resData?.code === -1) {
      const originalRequest = response.config;

      // Avoid infinite retry loop
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const tokenRefreshed = await ManageTokan();

          if (tokenRefreshed === true) {
            originalRequest.headers['token'] = localStorage.getItem(Constatnt.ACCESS_TOKEN_KEY);
            return AxiosClientApi(originalRequest);
          } else {
            logoutRedirection();
          }
        } catch (err) {
          logoutRedirection();
        }
      }
    }

    return resData; // ✅ Return normal data if no retry
  },

  // ❌ Handle HTTP error status (like 401)
  async error => {
    const originalRequest = error.config;

    if (
      error?.response?.data?.code === Codes.USER_SESSION_EXPIRE &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const tokenRefreshed = await ManageTokan();

        if (tokenRefreshed === true) {
          originalRequest.headers['token'] = localStorage.getItem(Constatnt.ACCESS_TOKEN_KEY);
          return AxiosClientApi(originalRequest);
        } else {
          logoutRedirection();
        }
      } catch (err) {
        logoutRedirection();
      }
    }

    if (error?.response?.status === 401) {
      logoutRedirection();
    }

    return Promise.reject(error);
  }
);


export default AxiosClientApi;

