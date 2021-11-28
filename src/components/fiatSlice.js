import {fetchRatesApi} from './fiatApi'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {LoadingState} from '../constants'
import {getCurrencyNameFromId} from "../helpers";

export const fetchRates = createAsyncThunk('fiat/fetch-rates', async () => {
  try {
    const response = await fetchRatesApi()
    return response
  } catch (error) {
    console.error(error.message)
  }
})

const fiatSlice = createSlice({
  name: 'fiat',
  initialState: {
    rates: [],
    status: LoadingState.idle
  },
  reducers: {},
  extraReducers: {
    [fetchRates.pending]: state => {
      state.status = LoadingState.loading
    },
    [fetchRates.fulfilled]: (state, action) => {
      state.status = LoadingState.success
      const fiatDetails = action.payload.data
        .filter((curr) => curr.type === "fiat")
        .map((curr) => ({...curr, name: getCurrencyNameFromId(curr.id)}));
      state.rates = fiatDetails
    },
    [fetchRates.rejected]: state => {
      state.status = LoadingState.failed
    }
  }
})
export default fiatSlice.reducer
