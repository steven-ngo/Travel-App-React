import {combineReducers} from 'redux'

import AuthReducer from './AuthReducer'
import DayDetailReducer from './DayDetailReducer'
import HomeReducer from './HomeReducer'
import SavedTripReducer from './SavedTripReducer'
import DayPickerReducer from './DayPickerReducer'

const combinedReducers = combineReducers({
  home: HomeReducer,
  savedTrips: SavedTripReducer,
  auth: AuthReducer,
  DayDetailReducer,
  DayPickerReducer,
})

export default combinedReducers
