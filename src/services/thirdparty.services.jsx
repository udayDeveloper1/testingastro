import axios from "axios";

// import { Decryption } from '../utils/CommonFunction';

// {
//     "server": "api60.ilovepdf.com",
//     "task": "g27d4mrsg3ztmnzAgm5d3njAghbj4cAkrlk1zh75sylkjddpx5nx6fz6zml9bmfb883A8tf73h28x278fkAzvrwqs9prhmghbt73ydhzy3td8jh59zwAybnmvhy4y26spzv9lkzjz0998kwwvwtbsdxrh2",
//     "remaining_files": 247,
//     "remaining_credits": 2470
// }
const AxiosClientApi = axios.create({
  // baseURL: 'https://api.ilovepdf.com',
  baseURL: "https://api60.ilovepdf.com",
});

// request AxiosClient
AxiosClientApi.interceptors.request.use(function (request) {
  request.headers[
    "Authorization"
  ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuaWxvdmVwZGYuY29tIiwiYXVkIjoiIiwiaWF0IjoxNzQzNDg5MjQyLCJuYmYiOjE3NDM0ODkyNDIsImV4cCI6MTc0MzQ5Mjg0MiwianRpIjoicHJvamVjdF9wdWJsaWNfMzAxYjVkMDYwMTk1ZWQ3Y2E0ZGQwMjEwNmM3OTdiNjNfV0NPa2Y4ZjIyNmE3ODc1ZTdmNTVjYjQ0NGZjN2JlZTJhNTA2YiJ9.Htn2P_MrakG1ZJSQxPKlOU2Z-GJRKeTv8D-g71cXY6A`;
  // request.headers['accept-language'] = localStorage.getItem(Constatnt.LANGUAGE_KEY) || Constatnt.LANGUAGE;
  // request.headers['role'] = Constatnt.ROLE;
  // request.headers['api-key'] = Constatnt.API_KEY;
  request.headers["Content-Type"] = "multipart/form-data";
  // request.headers['is_encript'] = false;
  return request;
});

// Response AxiosClient
AxiosClientApi.interceptors.response.use(
  function (response) {
    // if (response?.data?.code === Codes?.UNAUTHORIZED) {
    //     ManageTokan();
    // }
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      // logoutRedirection();
    }
    return Promise.reject(error); // Ensure the error is passed to the caller
  }
);

export default AxiosClientApi;
