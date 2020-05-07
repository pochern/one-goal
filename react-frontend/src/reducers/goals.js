const goalReducer = (state = {}, action) => {
  switch(action.type) {
    case 'GET_GOALS':
      return {loading: true}
    case 'GOALS_RECEIVED':
      const { payload } = action
      return { goals: payload, loading: false}
    case 'DELETE_GOAL':
      const { goalId } = action
      return state.goals.reduce( goal => goal.id === goalId)
    default:
      return state
  }
}

export default goalReducer
