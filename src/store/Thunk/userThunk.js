import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axiosInstance'

import { toast } from 'react-toastify'
import { handleUnauthorized } from '../../utils/unAuthorizeFun'
import {
  setApiLoading,
  setLoading,
  setPdfListData,
  setPdfListData2,
  setPdfListData3,
  setPdfListData4,
  setPDFUploadLoading,
  setTCType1PDFResponse
} from '../Slice/userSlice'

export const pdfListingApi = createAsyncThunk(
  'pdfListingApi',
  async ({ value, navigate }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true))
      const response = await axiosInstance.get(value)

      if (response?.status_code === 200 || response?.status_code === 201) {
        dispatch(setPdfListData(response?.data))
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))

        toast.error('Internal server error. Please try again later.')
      }

      switch (response?.status_code) {
        case 200:
          dispatch(setPdfListData(response?.data))
          dispatch(setLoading(false))
          break

        case 201:
          dispatch(setPdfListData(response?.data))
          dispatch(setLoading(false))
          break

        case 422: // Validation errors
          const validations = response?.data?.meta?.validations || []
          const errorMessages = validations
            .map(error => `${error.message}`)
            .join('\n')
          toast.warning(errorMessages, { autoClose: 5000 })
          break

        case 500: // Internal Server Error
          toast.error(response?.data?.meta?.message || 'Internal server error')
          break

        default:
          toast.info('Unexpected response from the server.')
      }
    } catch (error) {
      console.log(error?.response?.data?.status_code)
      if (error?.response?.data?.status_code == 401) {
        const refreshedResponse = await handleUnauthorized(
          pdfListingApi,
          dispatch,
          navigate,
          { value } // Args for the original call
        )

        if (!refreshedResponse) {
          return rejectWithValue('Failed to refresh token.')
        }

        return refreshedResponse // Return the retried response
      }
      dispatch(setLoading(false))
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const scopVerficationListingApi = createAsyncThunk(
  'scopVerficationListingApi',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/tc/type-one-list/`)
      if (response?.status_code === 200 || response?.status_code === 201) {
        dispatch(setPdfListData(response?.data))
      } else {
        toast.error('Internal server error. Please try again later.')
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

// -------------------------- below old code ---------------------------------------

export const pdfListingApi2 = createAsyncThunk(
  'pdfListingApi2',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `api/pdf/transaction-certificates-type2/`
      )
      if (response?.status_code === 200 || response?.status_code === 201) {
        dispatch(setPdfListData2(response?.data))
      } else {
        toast.error('Internal server error. Please try again later.')
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const PdfListing3 = createAsyncThunk(
  'PdfListing3',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `api/openai/scope-certifications/${id}/`
      )

      if (response?.status_code === 200 || response?.status_code === 201) {
        dispatch(setPdfListData3(response?.data))
      } else {
        toast.error('Internal server error. Please try again later.')
      }

      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const PdfListing4 = createAsyncThunk(
  'PdfListing4',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `api/scope-certificate/type-prod-crop/${id}/`
      )
      dispatch(setPdfListData4(response))

      // switch (response?.data?.meta?.status_code) {
      //   case 200:
      //     toast.success(response?.data?.meta?.message);
      //     return response.data;

      //     case 400:
      //       break;

      //   case 500:
      //     toast.error("Internal server error. Please try again later.");
      //     return rejectWithValue(response.data);

      //     case 401:
      //       break;

      //   default:
      //     toast.info("Unexpected response from server.");
      //     return rejectWithValue(response.data);
      // }
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const fetchScopeList = createAsyncThunk(
  'fetchScopeList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/scope-certificate/sc-type-one-list/`
      )

      if (response?.status === 200 || response?.status === 201) {
        dispatch(setPdfListData(response?.data))
        return response.data // Return data if successful
      } else {
        toast.error('Internal server error. Please try again later.')
        return rejectWithValue('Server error')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred')
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred'
      )
    }
  }
)

export const fetchScopeCertificateV3 = createAsyncThunk(
  'fetchScopeCertificateV3',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/scope-certificate/sc-version-3-point-0/`
      )

      if (response.status === 200 || response.status === 201) {
        dispatch(setPdfListData(response?.data))
        return response.data // Return data if successful
      } else {
        toast.error('Internal server error. Please try again later.')
        return rejectWithValue('Server error')
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred'
      toast.error(errorMessage)
      return rejectWithValue(errorMessage)
    }
  }
)

export const fetchForm1List = createAsyncThunk(
  'fetchForm1List',
  async (id, { dispatch, rejectWithValue }) => {
    dispatch(setApiLoading(true))
    try {
      const response = await axiosInstance.get(`/api/tc/type-one/${id}/`)

      dispatch(setTCType1PDFResponse(response.data))
      dispatch(setApiLoading(false))
      return response.data
    } catch (error) {
      dispatch(setApiLoading(false))
      return rejectWithValue(error.response?.data || 'Something went wrong')
    }
  }
)

export const fetchScopCertificationView = createAsyncThunk(
  'fetchScopCertificationView',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setApiLoading(true))
      const response = await axiosInstance.get(
        `/api/scope-certificate/sc-type-one/${id}/`
      )

      if (response?.status_code === 200 || response?.status_code === 201) {
        dispatch(setTCType1PDFResponse(response.data))
        dispatch(setApiLoading(false))
        return response.data?.extracted_data // Returning only extracted data
      } else {
        dispatch(setApiLoading(false))
        return rejectWithValue('Internal server error. Please try again later.')
      }
    } catch (error) {
      dispatch(setApiLoading(false))
      return rejectWithValue(error.response?.data || 'Something went wrong')
    }
  }
)
export const fetchFormVersion3List = createAsyncThunk(
  'fetchFormVersion3List',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setApiLoading(true))
      const response = await axiosInstance.get(
        `/api/scope-certificate/sc-version-3-point-0/${id}/`
      )
      if (response?.status_code === 200 || response?.status_code === 201) {
        dispatch(setTCType1PDFResponse(response.data))
        dispatch(setApiLoading(false))
        return response.data?.extracted_data // Returning only extracted data
      } else {
        dispatch(setApiLoading(false))
        return rejectWithValue('Internal server error. Please try again later.')
      }
    } catch (error) {
      dispatch(setApiLoading(false))
      return rejectWithValue(error.response?.data || 'Something went wrong')
    }
  }
)

export const PdfListing3Point0List = createAsyncThunk(
  'PdfListing3Point0List',
  async ({ formData }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setPDFUploadLoading(true))

      const response = await axiosInstance.post(
        'api/scope-certificate/groq-extract-sc-version-3-point-0/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (response?.status_code === 200 || response?.status_code === 201) {
        dispatch(setTCType1PDFResponse(response.data))

        toast.success('pdf submitted Successfully.')
        dispatch(setPDFUploadLoading(false))

        return { success: true, data: response.data } // ✅ Return success flagrs
      } else {
        dispatch(setPDFUploadLoading(false))

        toast.error('Internal server error. Please try again later.')
        return rejectWithValue(response?.data || 'Unexpected error')
      }
    } catch (error) {
      dispatch(setPDFUploadLoading(false))

      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const deleteScopeCertificateScType2 = createAsyncThunk(
  'deleteScopeCertificateScType2',
  async ({ id, deletePath, listingApiPath }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`${deletePath}/${id}/`, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response?.status_code === 200 || response?.status_code === 201) {
        dispatch(pdfListingApi({ value: listingApiPath }))
      }
      switch (response?.status_code) {
        case 200:
          dispatch(pdfListingApi({ value: listingApiPath }))
          toast.success(response?.message)
          return response.data

        case 201:
          dispatch(pdfListingApi({ value: listingApiPath }))
          toast.success(response?.message)
          return response.data

        case 400:
          break

        case 500:
          toast.error('Internal server error. Please try again later.')
          return rejectWithValue(response.data)

        case 401:
          break

        default:
          toast.info('Unexpected response from server.')
          return rejectWithValue(response.data)
      }
      return response.data // Return response data on success
    } catch (error) {
      console.error('Error in API request:', error)
      return rejectWithValue(error.response?.data || 'An error occurred')
    }
  }
)

export const editTCType1Form = createAsyncThunk(
  'editTCType1Form',
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setApiLoading(true))
      const response = await axiosInstance.put(
        `api/tc/type-one/update/${id}/`,
        data
      )
      if (response?.status_code === 200 || response?.status_code === 201) {
        dispatch(setApiLoading(false))

        toast.success('update successfully')
        //  dispatch(pdfListingApi({ value:selectedOption1 }));
      }
      dispatch(setApiLoading(false))

      return response.data // Return response data on success
    } catch (error) {
      console.error('Error in API request:', error)
      dispatch(setApiLoading(false))
      return rejectWithValue(error.response?.data || 'An error occurred')
    }
  }
)

export const editScopeVerificationForm = createAsyncThunk(
  'editScopeVerificationForm',
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setApiLoading(true))
      const response = await axiosInstance.put(
        `api/scope-certificate/sc-type-one/update/${id}/`,
        data
      )
      if (response?.status_code === 200 || response?.status_code === 201) {
        toast.success('update successfully')
        dispatch(setApiLoading(false))
      }
      return response.data // Return response data on success
    } catch (error) {
      dispatch(setApiLoading(false))
      console.error('Error in API request:', error)
      return rejectWithValue(error.response?.data || 'An error occurred')
    }
  }
)

export const editScopeVerificationFormVersion3 = createAsyncThunk(
  'editScopeVerificationFormVersion3',
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setApiLoading(true))
      const response = await axiosInstance.put(
        `api/scope-certificate/sc-version-3-point-0/update/${id}/`,
        data
      )
      if (response?.status_code === 200 || response?.status_code === 201) {
        toast.success('update successfully')
        //  dispatch(pdfListingApi({ value:selectedOption1 }));
        dispatch(setApiLoading(false))
      }
      dispatch(setApiLoading(false))
      return response.data // Return response data on success
    } catch (error) {
      console.error('Error in API request:', error)
      dispatch(setApiLoading(false))
      return rejectWithValue(error.response?.data || 'An error occurred')
    }
  }
)

export const createFormTcType1 = createAsyncThunk(
  'createFormTcType1',
  async ({ data, navigate }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setApiLoading(true))
      const response = await axiosInstance.post('api/tc/type-one/add/', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response?.status_code === 200 || response?.status_code === 201) {
        toast.success(response?.message)
        navigate('/')
        dispatch(setApiLoading(false))
      } else {
        toast.error(response?.message)
      }
      dispatch(setApiLoading(false))
      return response.data // Return the data for Redux state
    } catch (error) {
      console.error('Error in API request:', error)
      return rejectWithValue(error.response?.data || 'Something went wrong')
    }
  }
)

export const createScopeCertificateScType2 = createAsyncThunk(
  'createScopeCertificateScType2',
  async ({ data, navigate }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setApiLoading(true))
      const response = await axiosInstance.post(
        'api/scope-certificate/sc-type-one/add/',
        data,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      if (response?.status_code === 200 || response?.status_code === 201) {
        toast.success(response?.message)
        navigate('/')
        dispatch(setApiLoading(false))
      } else {
        toast.error(response?.message)
      }
      dispatch(setApiLoading(false))
      return response.data // Return response data for Redux state
    } catch (error) {
      console.error('Error in API request:', error)
    }
  }
)

export const createForm3ScopeCertificateV3_0 = createAsyncThunk(
  'scopeCertificate/createV3_0',
  async ({ data, navigate }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setApiLoading(true))

      const response = await axiosInstance.post(
        'api/scope-certificate/sc-version-3-point-0/add/',
        data,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      if (response?.status_code === 200 || response?.status_code === 201) {
        toast.success(response?.message)
        navigate('/')
        dispatch(setApiLoading(false))
      } else {
        toast.error(response?.message)
      }
      dispatch(setApiLoading(false))
      return response.data // Return response data for Redux state
    } catch (error) {
      console.error('Error in API request:', error)
      dispatch(setApiLoading(false))

      return rejectWithValue(error.response?.data || 'Something went wrong')
    }
  }
)

export const scopCertificationView = createAsyncThunk(
  'certification/view',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true))

      const response = await axiosInstance.get(
        `/api/scope-certificate/sc-type-one/${id}/`
      )

      dispatch(setLoading(false))
      return response.data // Ensure only `data` is returned
    } catch (error) {
      console.log(error?.response?.data?.status_code)

      if (error?.response?.data?.status_code === 401) {
        try {
          const refreshedResponse = await handleUnauthorized(
            scopCertificationView,
            dispatch,
            id
          )

          if (refreshedResponse) {
            return refreshedResponse
          } else {
            throw new Error('Failed to refresh token.')
          }
        } catch (refreshError) {
          dispatch(setLoading(false))
          return rejectWithValue(
            refreshError.response?.data || refreshError.message
          )
        }
      }

      dispatch(setLoading(false))
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)
