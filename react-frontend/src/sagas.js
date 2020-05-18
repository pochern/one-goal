import { put, takeLatest, all } from 'redux-saga/effects'

const checkForError = response => {
  if (!response.ok) throw Error(response.statusText);
  return response.json()
}

function* fetchGoals(action) {
  try {
    const data = yield fetch('/data.json')
    .then(response => response.json())
    yield put({type: 'GOALS_RECEIVED', payload: data.goals})
  } catch (e) {
    console.log(e)
  }
}

function* deleteGoal(action) {
  const goalId = action.payload.goalId
  try {
    const data = yield fetch('/data.json',
      {method: 'DELETE',
        headers: {
                'Content-Type': 'application/json',
              },
        body: JSON.stringify({'id': goalId,})
      })
    .then(data => data.json())
    yield put({type: 'GET_GOALS'})
  } catch (e) {
    console.log(e)
  }
}

function* checkGoal(action) {
  const goal = action.payload.goal
  const isCompleted = action.payload.isCompleted
  try {
    const data = yield fetch('/data.json',
      {method: 'PUT',
        headers: {
                  'Content-Type': 'application/json',
                },
        body: JSON.stringify({'id': goal.id, 'text': goal.text, 'completed': isCompleted})
      }
    )
    .then(data => data.json())
  } catch (e) {
    console.log(e)
  }
}

function* addGoal(action) {
  const goalText = action.payload.goalText
  try {
    const data = yield fetch('/data.json',
      {method: 'POST',
        headers: {
                'Content-Type': 'application/json',
              },
        body: JSON.stringify({'text': goalText})
      })
    .then(data => data.json())
    yield put({type: 'GET_GOALS'})
  } catch (e) {
    console.log(e)
  }
}

function* editGoal(action) {
  const { goal, goalText } = action.payload
  try {
    const data = yield fetch('/data.json',
      {method: 'PUT',
        headers: {
                'Content-Type': 'application/json',
              },
        body: JSON.stringify({'id': goal.id, 'text': goalText, 'completed': goal.completed})
      })
    .then(data => data.json())
  } catch (e) {
    console.log(e)
  }
}

/*
 *   Alternatively you may use takeLatest.
 *     Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 *       dispatched while a fetch is already pending, that pending fetch is cancelled
 *         and only the latest one will be run.
 *         */
export default function* () {
  yield all([
    getSaga(),
    deleteSaga(),
    checkSaga(),
    addSaga(),
    editSaga(),
  ])
}

export function* getSaga() {
  yield takeLatest('GET_GOALS', fetchGoals)
}

export function* deleteSaga() {
  yield takeLatest('DELETE_GOAL', deleteGoal)
}

export function* checkSaga() {
  yield takeLatest('CHECK_GOAL', checkGoal)
}

export function* addSaga() {
  yield takeLatest('ADD_GOAL', addGoal)
}

export function* editSaga() {
  yield takeLatest('EDIT_GOAL', editGoal)
}
