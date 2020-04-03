import produce from 'immer'
import {
  ADD_GOAL,
} from '../constants'

const initialState = []

function goals(state = initialState, action) {
  switch (action.type) {
    case ADD_GOAL:
      console.log('action payload ', action.payload)
      return produce(state, draftState => {
        draftState.push({text: "Tweet about it"})
        console.log('draftState ', draftState)
        console.log('action ', action)
      })
    default:
      return state
  }
}

export default goals
