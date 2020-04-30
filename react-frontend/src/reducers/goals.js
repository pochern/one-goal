const goalReducer = (state = [], action) => {
  switch(action.type) {
    case 'GET_GOALS':
      return {...state, loading: true}
    case 'GOALS_RECEIVED':
      return {...state, goals: action.json, loading: false}
    default:
      return state
  }
}

export default goalReducer
