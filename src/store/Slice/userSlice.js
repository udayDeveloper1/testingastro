import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pdfListData: [],
  pdfListingData3: [],
  PdfListData2: [],
  PdfListData4: [],
  TCType1ExtractedData:null,
  scopeVerificationPDFExtractData:{},
  scopeVerificationVersion3PDFExtractData:{},
  loading:false,
  pdfLoading:false,
  createLoadiing:false,
  apiLoading:false,
  listingApiPath:"/api/tc/type-one-list/",
  deleteApiPath:"api/tc/remove-type-one",
  path:"TcType1",
  updateApiPath:"api/tc/type-one/update",
  labelForPDF:"Transaction Certificate - Type 1",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    setPath: (state, action) => {
      state.path = action.payload;
    },
    setLabelForPDF: (state, action) => {
      state.labelForPDF = action.payload;
    },
    setListingApiPath: (state, action) => {
      state.listingApiPath = action.payload;
    },
    setUpdateApiPath: (state, action) => {
      state.updateApiPath = action.payload;
    },
    setDeleteApiPath: (state, action) => {
      state.deleteApiPath = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCreateLoading: (state, action) => {
      state.createLoadiing = action.payload;
    },
    setApiLoading: (state, action) => {
      state.apiLoading = action.payload;
    },
    setPDFUploadLoading: (state, action) => {
      state.pdfLoading = action.payload;
    },
    setPdfListData: (state, action) => {
      state.pdfListData = action.payload;
    },
    setPdfListData3: (state, action) => {
      state.pdfListingData3 = [action.payload];
    },
    setPdfListData2: (state, action) => {
      state.PdfListData2 = action.payload;
    },
    setPdfListData4: (state, action) => {
      state.PdfListData4 = action.payload;
    },
    setTCType1PDFResponse: (state, action) => {
      
      state.TCType1ExtractedData = action.payload;
    },
    setScopeVerificationResponse:(state,action)=>{
      state.scopeVerificationPDFExtractData = action.payload;

    },
    setScopeVerificationVersion3response:(state,action)=>{
      state.scopeVerificationVersion3PDFExtractData = action.payload;

    }
  },
});

export const {setLabelForPDF,setUpdateApiPath,setPath,setDeleteApiPath,setListingApiPath,setApiLoading,setCreateLoading,setPDFUploadLoading, setLoading,setPdfListData, setPdfListData3, setPdfListData2, setPdfListData4,setScopeVerificationResponse,setScopeVerificationVersion3response,setTCType1PDFResponse } = userSlice.actions;

export default userSlice.reducer;
