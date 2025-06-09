import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/Slice/userSlice";
import authReducer from './Slice/authSlice';
import specificDataReducer from "./Slice/specificDataSlice"
export const store = configureStore({
  reducer: {
    userReducer,
    specificDataReducer,
    auth: authReducer,
  },
});
  