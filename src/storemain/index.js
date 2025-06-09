import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slice/UserSlice";
import MasterSlice from "./slice/MasterSlice";
import HomePageSlice from "./slice/HompageSlice";
import AstroDetailsDataSlice from "./slice/astroLogerDetailsSlice";
import muhuratDataSlice from "./slice/muhuratDataSlice";
const store = configureStore({
    reducer: {
        masterSlice: MasterSlice,
        userSlice: UserSlice,
        HomePageSlice: HomePageSlice,
        AstroDetailsDataSlice: AstroDetailsDataSlice,
        muhuratDataSlice: muhuratDataSlice,
    },
});

export default store;
