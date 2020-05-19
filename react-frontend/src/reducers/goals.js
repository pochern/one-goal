import produce from "immer"

const INITIAL_STATE = { goalList: [] }

const goalReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'GET_GOALS': {
      return {loading: true}
    }
    case 'GOALS_RECEIVED': {
      const { payload } = action
      return { goalList: payload, loading: false }
    }
    case 'DELETE_GOAL': {
      const { goalId } = action.payload
      return produce(state, draft => {
        draft.goalList = draft.goalList.filter( goal => goal.id !== goalId)})
    }
    case 'CHECK_GOAL': {
      const { isCompleted, goal } = action.payload
      return produce(state, draft => {
        draft.goalList.find(element => element.id===goal.id).completed = isCompleted
      })
    }
    case 'EDIT_GOAL': {
      const { goalText, goal } = action.payload
      return produce(state, draft => {
        draft.goalList.find(element => element.id===goal.id).text = goalText
      })
    }
    default: {
      return state
    }
  }
}

export default goalReducer
