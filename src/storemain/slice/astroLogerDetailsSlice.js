import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  astroDetails: {},
  astroPaymentDetails: {}
};

const astroDetailsDataSlice = createSlice({
  name: "astroDetailsDataSlice",
  initialState: initialState,
  reducers: {
    setAstroDetails: (state, action) => {
      state.astroDetails = action.payload;
    },
    setAstroPaymentDetails: (state, action) => {
      state.astroPaymentDetails = action.payload;
    },
  },
});

export const { setAstroDetails, setAstroPaymentDetails } = astroDetailsDataSlice.actions;

export default astroDetailsDataSlice.reducer;
