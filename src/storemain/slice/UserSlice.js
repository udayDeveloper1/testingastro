import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginUserDetails :{}
};

const userSlice = createSlice({
    name: "USER_SLICE",
    initialState,
    reducers: {
        setLoginDataDetails: (state, action) => {
            state.loginUserDetails = action.payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         // .addCase(getUsersData.fulfilled, (state, action) => {
    //         //     state.userList.data = action.payload;
    //         // })
    //         // .addCase(getUsersData.rejected, (state, action) => {
    //         //     state.userList.error = action.error.message;
    //         // })
    // },
});

export const { setLoginDataDetails} = userSlice.actions;
export default userSlice.reducer;
