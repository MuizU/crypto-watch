import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {fetchCoinApi} from './coinApi'
import {LoadingState} from '../constants'

export const fetchCoin = createAsyncThunk('coin/fetch-asset', async (id) => {
  try {
    const response = await fetchCoinApi(id)
    return response
  } catch (error) {
    console.error(error.message);
  }
})

const coinSlice = createSlice({
  name: 'coin',
  initialState: {
    coinInfo: {},
    status: LoadingState.idle
  },
  reducers: {},
  extraReducers: {
    [fetchCoin.pending]: state => {
      state.status = LoadingState.loading
    },
    [fetchCoin.fulfilled]: (state, action) => {
      state.status = LoadingState.success
      state.coinInfo = action.payload.data
    },
    [fetchCoin.rejected]: state => {
      state.status = LoadingState.failed
    }
  }
})

export default coinSlice.reducer
