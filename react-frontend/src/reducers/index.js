import { combineReducers } from 'redux'

import goalReducer from './goals'

const allReducers = combineReducers({
  goals: goalReducer
})

export default allReducers
