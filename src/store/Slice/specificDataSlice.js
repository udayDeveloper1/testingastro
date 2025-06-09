import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  standardData: [],
  countryAreaData: [],
  stateOrProvisionCodeData: [],
  productDetailCodesData: [],
  rawMaterialCodesData: [],
  standardsLabelGradeData: [],
  productCategoryCodesData: [],
  processCategoryCodesData: [],
  accreditationBodyCodeAbCodeData: [],
  certificateBodyLicensingCodeCbCodeData: [],
  organicFarmStandardsCodeData: [],
};

const specificDataSlice = createSlice({
  name: "specificDataSlice",
  initialState: initialState,
  reducers: {
    setStandardData: (state, action) => {
      state.standardData = action.payload;
    },
    setCountryAreaData: (state, action) => {
      state.countryAreaData = action.payload;
    },
    setStateOrProvisionCodeData: (state, action) => {
      state.stateOrProvisionCodeData = action.payload;
    },
    setProductDetailCodesData: (state, action) => {
      state.productDetailCodesData = action.payload;
    },
    setRawMaterialCodesData: (state, action) => {
      state.rawMaterialCodesData = action.payload;
    },
    setStandardsLabelGradeData: (state, action) => {
      state.standardsLabelGradeData = action.payload;
    },
    setProductCategoryCodesData: (state, action) => {
      state.productCategoryCodesData = action.payload;
    },
    setProcessCategoryCodesData: (state, action) => {
      state.processCategoryCodesData = action.payload;
    },
    setAccreditationBodyCodeAbCodeData: (state, action) => {
      state.accreditationBodyCodeAbCodeData = action.payload;
    },
    setCertificateBodyLicensingCodeCbCodeData: (state, action) => {
      state.certificateBodyLicensingCodeCbCodeData = action.payload;
    },
    setOrganicFarmStandardsCodeData: (state, action) => {
      state.organicFarmStandardsCodeData = action.payload;
    },
  },
});

export const { setStandardData, setCountryAreaData, setStateOrProvisionCodeData, setProductDetailCodesData, setRawMaterialCodesData, setStandardsLabelGradeData, setProductCategoryCodesData, setProcessCategoryCodesData, setAccreditationBodyCodeAbCodeData, setCertificateBodyLicensingCodeCbCodeData, setOrganicFarmStandardsCodeData } = specificDataSlice.actions;

export default specificDataSlice.reducer;
