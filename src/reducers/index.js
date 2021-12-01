import { combineReducers } from 'redux'
import summoners from './summoners'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  summoners,
  loadingBar: loadingBarReducer,
})