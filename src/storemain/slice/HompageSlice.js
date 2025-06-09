import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getDivisionalChartTh,
  homePageListing,
  listFAQs,
  planetDataTodayPanchang,
  todaysPanchang
} from '../../services/api/api.services'
import { TOAST_ERROR } from '../../utils/CommonFunction'
import { Codes } from '../../utils/CommonVariable'

export const getHomePageListing = createAsyncThunk(
  'homePageListing',
  async (submitData, { dispatch }) => {
    try {
      // dispatch(setLoading({ is_loading: true, loding_type: 'homepage' }))
      const { data } = await homePageListing(submitData)
      // dispatch(setLoading({ is_loading: false, loding_type: 'homepage' }))
      return data
    } catch (error) {
      throw error
    }
  }
)

export const getFAQList = createAsyncThunk(
  'FAQList',
  async (submitData, { dispatch }) => {
    try {
      // dispatch(setLoading({ is_loading: true, loding_type: 'homepage' }))
      const { data } = await listFAQs(submitData)
      // dispatch(setLoading({ is_loading: false, loding_type: 'homepage' }))
      return data
    } catch (error) {
      throw error
    }
  }
)

export const getTodaysPanchangAPi = createAsyncThunk(
  'PanchangApi',
  async ({ submitData }, { dispatch }) => {
    try {
      // dispatch(setLoading({ is_loading: true, loding_type: 'homepage' }))
      const { data, code, message } = await todaysPanchang(submitData)
      // dispatch(setLoading({ is_loading: false, loding_type: 'homepage' }))
      if (code === Codes?.SUCCESS) {
        return data
      } else {
        TOAST_ERROR(message)
        return data
      }
    } catch (error) {
      throw error
    }
  }
)

export const getPlanetDataForTodayPanchang = createAsyncThunk(
  'getPlanetDataForTodayPanchang',
  async ({ submitData }, { dispatch }) => {
    try {
      // dispatch(setLoading({ is_loading: true, loding_type: 'homepage' }))
      const { data } = await planetDataTodayPanchang(submitData)
      // dispatch(setLoading({ is_loading: false, loding_type: 'homepage' }))
      return data
    } catch (error) {
      throw error
    }
  }
)

export const getLagnaChartData = createAsyncThunk(
  'getLagnaChartData',
  async ({ submitData }, { dispatch }) => {
    try {
      // dispatch(setLoading({ is_loading: true, loding_type: 'homepage' }))
      const { data } = await getDivisionalChartTh(submitData)

      // dispatch(setLoading({ is_loading: false, loding_type: 'homepage' }))
      return data
    } catch (error) {
      throw error
    }
  }
)

export const getRahuKaalData = createAsyncThunk(
  'getRahuKaalData',
  async ({ submitData }, { dispatch }) => {
    try {
      // dispatch(setLoading({ is_loading: true, loding_type: 'homepage' }))
      const { data } = await getRaahuKaal(submitData)

      // dispatch(setLoading({ is_loading: false, loding_type: 'homepage' }))
      return data
    } catch (error) {
      throw error
    }
  }
)

const initialState = {
  homapageList: {
    data: {},
    error: null
  },
  listFAQs: {
    data: [],
    error: null
  },
  todayPanchang: {
    data: {},
    error: null
  },
  planetDataForTodayPanchang: {
    data: {},
    error: null
  },
  lagnaChart: {
    data: {},
    error: null
  },
  raahukaal: {
    data: {},
    error: null
  }
}

const homePageSlice = createSlice({
  name: 'HOME_PAGE_SLICE',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getHomePageListing.fulfilled, (state, action) => {
        state.homapageList.data = action.payload
      })
      .addCase(getHomePageListing.rejected, (state, action) => {
        state.homapageList.error = action.error.message
      })

      // FAQ List
      .addCase(getFAQList.fulfilled, (state, action) => {
        state.listFAQs.data = action.payload
        state.listFAQs.error = null
      })
      .addCase(getFAQList.rejected, (state, action) => {
        state.listFAQs.error = action.error.message
      })

      // TodayPanchang List
      .addCase(getTodaysPanchangAPi.fulfilled, (state, action) => {
        state.todayPanchang.data = action.payload
        state.todayPanchang.error = null
      })
      .addCase(getTodaysPanchangAPi.rejected, (state, action) => {
        state.todayPanchang.error = action.error.message
      })

      .addCase(getPlanetDataForTodayPanchang.fulfilled, (state, action) => {
        state.planetDataForTodayPanchang.data = action.payload
        state.planetDataForTodayPanchang.error = null
      })
      .addCase(getPlanetDataForTodayPanchang.rejected, (state, action) => {
        state.planetDataForTodayPanchang.error = action.error.message
      })

      .addCase(getLagnaChartData.fulfilled, (state, action) => {
        state.lagnaChart.data = action.payload
        state.lagnaChart.error = null
      })
      .addCase(getLagnaChartData.rejected, (state, action) => {
        state.lagnaChart.error = action.error.message
      })

      .addCase(getRahuKaalData.fulfilled, (state, action) => {
        state.raahukaal.data = action.payload
        state.raahukaal.error = null
      })
      .addCase(getRahuKaalData.rejected, (state, action) => {
        state.raahukaal.error = action.error.message
      })
  }
})

export const { setLoginDataDetails } = homePageSlice.actions
export default homePageSlice.reducer
