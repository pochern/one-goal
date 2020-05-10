import produce from "immer"

const goalReducer = (state = {}, action) => {
  switch(action.type) {
    case 'GET_GOALS':
      return {loading: true}
    case 'GOALS_RECEIVED':
      const { payload } = action
      return { goals: payload, loading: false}
    case 'DELETE_GOAL':
      const { goalId } = action.payload
      return state.goals.reduce( goal => goal.id === goalId)
    case 'CHECK_GOAL':
      const { isCompleted, goal } = action.payload
      return produce(state, draft => {
        //change goal.completed value to isCompleted
        draft.goals.find(element => element.id===goal.id).completed = isCompleted
      })
    default:
      return state
  }
}

export default goalReducer
