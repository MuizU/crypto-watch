import {combineReducers} from '@reduxjs/toolkit'
import coinSlice from '../components/coinSlice'
import exchangeSlice from '../components/exchangeSlice'
import fiatSlice from '../components/fiatSlice'
import homeSlice from '../components/homeSlice'

const rootReducer = combineReducers({
  exchange: exchangeSlice,
  fiat: fiatSlice,
  home: homeSlice,
  coin: coinSlice
})
export default rootReducer
