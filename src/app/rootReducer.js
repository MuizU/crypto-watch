import {combineReducers} from '@reduxjs/toolkit'
import coinSlice from 'views/CoinPage/coinSlice'
import exchangeSlice from 'views/ExchangePage/exchangeSlice'
import fiatSlice from 'views/FiatPage/fiatSlice'
import homeSlice from 'views/Home/homeSlice'

const rootReducer = combineReducers({
  exchange: exchangeSlice,
  fiat: fiatSlice,
  home: homeSlice,
  coin: coinSlice
})
export default rootReducer
