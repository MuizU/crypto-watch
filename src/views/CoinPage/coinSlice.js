import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCoinApi, fetchCoinHistoryApi } from "views/CoinPage/coinApi";
import { LoadingState } from "utils/constants";
import { convertToDate } from "utils/helpers";
import _ from "lodash";
import { toast } from "react-toastify";

export const fetchCoin = createAsyncThunk(
  "coin/fetch-coin",
  async (payload) => {
    try {
      const response = await fetchCoinApi(payload);
      return response;
    } catch (error) {
      toast.error(error.message);
    }
  }
);

export const fetchCoinHistory = createAsyncThunk(
  "coin/fetch-history",
  async (payload) => {
    try {
      const response = await fetchCoinHistoryApi(payload);
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }
);

const coinSlice = createSlice({
  name: "coin",
  initialState: {
    coinInfo: {},
    status: LoadingState.idle,
    coinHistory: [],
    coinHistoryStatus: LoadingState.idle,
  },
  reducers: {},
  extraReducers: {
    [fetchCoin.pending]: (state) => {
      state.status = LoadingState.loading;
    },
    [fetchCoin.fulfilled]: (state, action) => {
      state.status = LoadingState.success;
      state.coinInfo = action.payload?.data;
    },
    [fetchCoin.rejected]: (state) => {
      state.status = LoadingState.failed;
    },
    [fetchCoinHistory.pending]: (state) => {
      state.coinHistoryStatus = LoadingState.loading;
    },
    [fetchCoinHistory.fulfilled]: (state, action) => {
      state.coinHistoryStatus = LoadingState.success;
      const chd = action.payload?.data.map((hist) => ({
        ...hist,
        dateTime: convertToDate(hist.time, "dddd, MMMM Do YYYY, h:mm:ss a"),
      }));
      state.coinHistoricalData = _.uniqBy(chd, (e) => {
        return e.date;
      });
    },
    [fetchCoinHistory.rejected]: (state) => {
      state.coinHistoryStatus = LoadingState.failed;
    },
  },
});

export default coinSlice.reducer;
