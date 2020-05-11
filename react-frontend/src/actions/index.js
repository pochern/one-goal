export const getGoals = () => {
  return {
    type: 'GET_GOALS'
  }
}

export const checkGoal = (isCompleted, goal) => {
  return {
    type: 'CHECK_GOAL',
    payload: { isCompleted, goal },
  }
}

export const deleteGoal = (goalId) => {
  return {
    type: 'DELETE_GOAL',
    payload: { goalId },
  }
}

export const addGoal = (goalText) => {
  return {
    type: 'ADD_GOAL',
    payload: { goalText },
  }
}
