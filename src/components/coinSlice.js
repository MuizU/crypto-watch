import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {fetchAssetApi} from './coinApi'
import {LoadingState} from '../constants'

export const fetchAsset = createAsyncThunk('coin/fetch-asset', async (id) => {
  try {
    const response = await fetchAssetApi(id)
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
    [fetchAsset.pending]: state => {
      state.status = LoadingState.loading
    },
    [fetchAsset.fulfilled]: (state, action) => {
      state.status = LoadingState.success
      state.coinInfo = action.payload.data
    },
    [fetchAsset.rejected]: state => {
      state.status = LoadingState.failed
    }
  }
})

export default coinSlice.reducer
