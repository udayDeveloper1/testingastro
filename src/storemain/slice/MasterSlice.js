import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { astrologerList, blogListing, DashboardCount, filterDataList, generateMuhuratBlog, geo_search, getPanchangTh } from "../../services/api/api.services";
import { Codes } from "../../utils/CommonVariable";
import { closeLoder, hasAtLeastOneResponseData } from "../../utils/CommonFunction";
import { Constatnt } from "../../utils/Constent";

export const getFilterListing = createAsyncThunk(
    "getFilterListing",
    async (submitData, { dispatch }) => {
        try {
            // dispatch(setLoading({ is_loading: true, loding_type: 'homepage' }))
            const { data } = await filterDataList(submitData);
            // dispatch(setLoading({ is_loading: false, loding_type: 'homepage' }))
            return data;
        } catch (error) {
            throw error;
        }
    }
);

export const getDashboardCount = createAsyncThunk(
    "dashboardCount",
    async (submitData, { dispatch }) => {
        try {
            // dispatch(setLoading({ is_loading: true, loding_type: 'homepage' }))
            const { data } = await DashboardCount(submitData);
            // dispatch(setLoading({ is_loading: false, loding_type: 'homepage' }))
            return data;
        } catch (error) {
            throw error;
        }
    }
);

export const getAstrologerList = createAsyncThunk(
    "astrologerList",
    async (submitData, { dispatch }) => {
        try {
            const { data } = await astrologerList(submitData);
            return data;
        } catch (error) {
            throw error;
        }
    }
);

export const getDashboardPanchang = createAsyncThunk(
    "DashboardPanchang",
    async (submitData, { dispatch }) => {
        try {
            // const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) || LanguageOption?.ENGLISH;
            // const panchangeData = localStorage?.getItem(Constatnt?.PANCHANGE_KEY);
            // const parsedData = panchangeData ? JSON.parse(panchangeData) : {};
            // const isDataMissing = !hasAtLeastOneResponseData(parsedData?.response);
            // // ✅ Check if language is changed
            // const isLanguageChanged = parsedData?.request?.lang !== LocalLanguage;
            // if (isDataMissing || isLanguageChanged) {
            const { data } = await getPanchangTh(submitData);
            // dispatch(setLoading({ is_loading: false, loding_type: 'homepage' }))
            localStorage?.setItem(Constatnt?.PANCHANGE_KEY, JSON.stringify(data));
            return data;
            // } else {
            //     return parsedData;
            // }
        } catch (error) {
            throw error;
        }
    }
);

export const getGeoSearchLoaction = createAsyncThunk(
    "GeoSearchLoaction",
    async (submitData, { dispatch }) => {
        try {
            // dispatch(setLoading({ is_loading: true, loding_type: 'homepage' }))
            const { data } = await geo_search(submitData);
            // dispatch(setLoading({ is_loading: false, loding_type: 'homepage' }))
            return data.response[0];
        } catch (error) {
            throw error;
        }
    }
);

export const generateMuhuratBlogThunk = createAsyncThunk(
    "generateMuhuratBlog",
    async (submitData, { dispatch }) => {
        try {
            // dispatch(setLoading({ is_loading: true, loding_type: 'homepage' }))
            const { data, code } = await generateMuhuratBlog(submitData);
            // dispatch(setLoading({ is_loading: false, loding_type: 'homepage' }))
            if (code === Codes?.SUCCESS) {
                closeLoder(dispatch);
                return data;
            } else {
                closeLoder(dispatch);
                return {};
            }
        } catch (error) {
            throw error;
        }
    }
);

export const blogListingThunk = createAsyncThunk(
    "blogListing",
    async (submitData, { dispatch }) => {
        try {
            // dispatch(setLoading({ is_loading: true, loding_type: 'homepage' }))
            const { data } = await blogListing(submitData);
            // dispatch(setLoading({ is_loading: false, loding_type: 'homepage' }))
            return data;
        } catch (error) {
            throw error;
        }
    }
);



const initialState = {
    loader: {
        is_loading: false,
        loding_type: ''
    },
    modal: {
        is_model: false,
        model_type: ''
    },
    isScroll: {
        is_scroll: false,
        is_scroll_type: ""
    },
    filter_search: "",
    filter_value: {},
    sort_by_value: {},
    getFilterList: {},
    onSubmitFilter: false,
    currentLanguage: 'en',
    loginUser: {
        is_login: false,
        loginUserData: ''
    },
    kundliDetailsData: {},
    dashboardCount: {},
    pageScroll: false,
    astrologerListData: [],
    panchangDetails: {},
    location: {},
    muhratData: {},
    blogListData: []
};

const masterSlice = createSlice({
    name: "MASTER_SLICE",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            const { is_loading, loding_type } = action.payload;
            state.loader = state.loader || {}; // Ensure loader exists
            state.loader.is_loading = is_loading;
            state.loader.loding_type = loding_type; // Check for typo if needed
        },
        setModel: (state, action) => {
            const { is_model, model_type } = action.payload;
            state.modal = state.modal || {}; // Ensure modal exists
            state.modal.is_model = is_model;
            state.modal.model_type = model_type;
        },
        changeLanguage: (state, action) => {
            state.currentLanguage = action.payload;
        },
        setIsScroll: (state, action) => {
            const { is_scroll, is_scroll_type } = action.payload;
            // state.isScroll = state.isScroll || {}; // Ensure loader exists
            state.isScroll.is_scroll = is_scroll;
            state.isScroll.is_scroll_type = is_scroll_type; // Check for typo if needed
        },
        setUserLoginData: (state, action) => {
            const { is_login, loginUserData } = action.payload;
            state.loginUser.is_login = is_login;
            state.loginUser.loginUserData = loginUserData;
        },
        setKundliDetailsData: (state, action) => {
            // const {kundliDetailsData} = action.payload;
            state.kundliDetailsData = action.payload;
        },
        setFilterValue: (state, action) => {
            state.filter_value = action.payload;
        },
        setShortValue: (state, action) => {
            state.sort_by_value = action.payload;
        },
        setOnSubmitFilter: (state, action) => {
            state.onSubmitFilter = action.payload;
        },
        setFilterSearch: (state, action) => {
            state.filter_search = action.payload;
        },
        setPageScroll: (state, action) => {
            state.pageScroll = action.payload;
        },
        setPanchangDetails: (state, action) => {
            state.panchangDetails = action.payload;
        },

        // resetStore: () => initialState
    },

    extraReducers: (builder) => {
        builder
            .addCase(getFilterListing.fulfilled, (state, action) => {
                state.getFilterList = action.payload;
            })
            .addCase(getFilterListing.rejected, (state, action) => {
                state.getFilterList = [];
            })
            .addCase(getDashboardCount.fulfilled, (state, action) => {
                state.dashboardCount = action.payload;
            })
            .addCase(getDashboardCount.rejected, (state, action) => {
                state.dashboardCount = [];
            })

            .addCase(getAstrologerList.fulfilled, (state, action) => {
                state.astrologerListData = action.payload;
            })
            .addCase(getAstrologerList.rejected, (state, action) => {
                state.astrologerListData = [];
            })

            .addCase(getDashboardPanchang.fulfilled, (state, action) => {
                state.panchangDetails = action.payload;
            })
            .addCase(getDashboardPanchang.rejected, (state, action) => {
                state.panchangDetails = {};
            })

            .addCase(getGeoSearchLoaction.fulfilled, (state, action) => {
                state.location = action.payload;
            })
            .addCase(getGeoSearchLoaction.rejected, (state, action) => {
                state.location = {};
            })

            .addCase(generateMuhuratBlogThunk.fulfilled, (state, action) => {
                state.muhratData = action.payload;
            })
            .addCase(generateMuhuratBlogThunk.rejected, (state, action) => {
                state.muhratData = {};
            })

            .addCase(blogListingThunk.fulfilled, (state, action) => {
                state.blogListData = action.payload;
            })
            .addCase(blogListingThunk.rejected, (state, action) => {
                state.blogListData = {};
            })

    }
},
);

export const { setLoading, setModel, changeLanguage, setIsScroll, setUserLoginData, resetStore, setKundliDetailsData, setFilterValue, setShortValue, setOnSubmitFilter, setFilterSearch, setPageScroll, setPanchangDetails } = masterSlice.actions;
export default masterSlice.reducer;