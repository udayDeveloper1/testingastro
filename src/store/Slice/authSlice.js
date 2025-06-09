import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../Thunk/axiosInstance';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setToken, setRefreshToken, clearTokens } from './tokenSlice'; // Correct import
import { setApiLoading } from '../Slice/userSlice';

// Login Thunk
export const refreshAccessToken = createAsyncThunk(
  'auth/refreshToken',
  async ({refreshToken,navigate}, { dispatch, rejectWithValue }) => {
    try {
      // const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axiosInstance.post('auth/refresh/', {
        refresh: refreshToken
      });

      if (response?.access) {
        // Update only access token, keep the same refresh token
        dispatch(setToken(response?.access));
        localStorage.setItem('authToken', response?.access);
        return response?.access;
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      dispatch(logoutUser());
      toast.error('Session expired. Please login again.');
      return rejectWithValue('Session expired. Please login again.');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ credentials, navigate }, { dispatch, rejectWithValue }) => {
     dispatch(setApiLoading(true));
    try {
      
      const response = await axiosInstance.post('auth/login/', credentials);

      switch (response.status_code ) {
        case 200:
          const { access, refresh } = response?.data;
          // Update Redux state with tokens
          localStorage.setItem('authToken',access); // Store in localStorage
          localStorage.setItem('refreshToken', refresh); // Store in localStorage
       
          dispatch(setToken(access)); // Set access token
          dispatch(setRefreshToken(refresh)); // Set refresh token
  
          navigate('/'); // Navigate after successful login
          dispatch(setApiLoading(false));
          return response.data;
          break;

          case 201:

            // Update Redux state with tokens
            localStorage.setItem('authToken',access); // Store in localStorage
            localStorage.setItem('refreshToken', refresh); // Store in localStorage
         
            dispatch(setToken(access)); // Set access token
            dispatch(setRefreshToken(refresh)); // Set refresh token
    
            navigate('/'); // Navigate after successful login
            dispatch(setApiLoading(false));
            return response.data;
          break;

        case 401: // Unauthorized - Access token expired

        
        dispatch(setApiLoading(false));
          return refreshedResponse; // Return the retried response

        case 422: // Validation errors
        dispatch(setApiLoading(false));
          break;

        case 500: // Internal Server Error
        dispatch(setApiLoading(false));
        toast.error(response);
          break;

        default:
          dispatch(setApiLoading(false));
          toast.info("Unexpected response from the server.");
      }

      // if (response.status_code === 200 || response.status_code === 201) {
      //   const { access, refresh } = response?.data;

      //   // Update Redux state with tokens
      //   localStorage.setItem('authToken',access); // Store in localStorage
      //   localStorage.setItem('refreshToken', refresh); // Store in localStorage
     
      //   dispatch(setToken(access)); // Set access token
      //   dispatch(setRefreshToken(refresh)); // Set refresh token

      //   navigate('/'); // Navigate after successful login

      // } else {
      //   console.error('Login response:', response); // Log the response
      //   toast.error('Login failed. Please try again.');
      // }
    } catch (error) {
      console.error('Login error:', error); // Log the error
      toast.error(error.response?.data?.error || 'Login failed');
      dispatch(setApiLoading(false));
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    // Remove tokens from localStorage
    localStorage.removeItem('authToken'); // Remove access token
    localStorage.removeItem('refreshToken'); // Remove refresh token
    dispatch(clearTokens()); // Clear tokens in Redux state
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem('authToken'),
  isAuthenticated: !!localStorage.getItem('authToken'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        state.loading = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer; 