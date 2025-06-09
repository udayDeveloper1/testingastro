import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    access: localStorage.getItem('authToken') || null, // Initialize from localStorage
    refresh: localStorage.getItem('refreshToken') || null, // Initialize from localStorage
  },
  reducers: {
    setToken: (state, action) => {
      state.access = action.payload; // Set access token
      
      localStorage.setItem('authToken', action.payload); // Store in localStorage
    },
    setRefreshToken: (state, action) => {
      state.refresh = action.payload; // Set refresh token
      localStorage.setItem('refreshToken', action.payload); // Store in localStorage
    },
    clearTokens: (state) => {
      state.access = null; // Clear access token
      state.refresh = null; // Clear refresh token
      localStorage.removeItem('authToken'); // Remove from localStorage
      localStorage.removeItem('refreshToken'); // Remove from localStorage
    },
  },
});

// Export actions
export const { setToken, setRefreshToken, clearTokens } = tokenSlice.actions;

// Export reducer
export default tokenSlice.reducer; 