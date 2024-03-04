import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import combinedReducer from '../reducer'

const reduxStore = createStore(combinedReducer, applyMiddleware(logger, thunk))

export default reduxStore
