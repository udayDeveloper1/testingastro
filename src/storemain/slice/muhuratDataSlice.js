import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  marriageMuhuratData: [],
};

const muhuratDataSlice = createSlice({
  name: "muhuratDataSlice",
  initialState: initialState,
  reducers: {
    setMarriageMuhuratData: (state, action) => {
      state.marriageMuhuratData = action.payload;
    },
  },
});

export const { setMarriageMuhuratData, } = muhuratDataSlice.actions;

export default muhuratDataSlice.reducer;