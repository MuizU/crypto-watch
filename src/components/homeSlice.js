import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {fetchAssetsApi} from './homeApi'
import {LoadingState} from '../constants'

export const fetchAsset = createAsyncThunk('home/fetch-assets', async () => {
  try {
    const response = await fetchAssetsApi()
    return response
  } catch (error) {
    console.error(error.message)
  }

})

const homeSlice = createSlice({
  name: "home",
  initialState: {
    coinDetails: [],
    status: LoadingState.idle
  }, reducers: {},
  extraReducers: {
    [fetchAsset.pending]: state => {
      state.status = LoadingState.idle
    },
    [fetchAsset.fulfilled]: (state, action) => {
      state.status = LoadingState.success
      state.coinDetails = action.payload?.data
    },
    [fetchAsset.rejected]: state => {
      state.status = LoadingState.failed
    }
  }
})

export default homeSlice.reducer
