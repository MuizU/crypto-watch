import {fetchExchangesApi} from './exchangeApi'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {LoadingState} from '../constants'

export const fetchExchanges = createAsyncThunk('exchanges/fetchExchanges', async () => {
  const response = await fetchExchangesApi()
  return response
})

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState: {
    exchanges: [],
    exchangeStatus: LoadingState.idle

  },
  extraReducers: {
    [fetchExchanges.pending]: state => {
      state.exchangeStatus = LoadingState.loading
    },
    [fetchExchanges.fulfilled]: (state, action) => {
      state.exchangeStatus = LoadingState.success
      state.exchanges = action.payload.data
    }
  }
})

export default exchangeSlice.reducer
