import { put, takeLatest, all } from 'redux-saga/effects'

function* fetchGoals(action) {
  try {
    // do api call
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
    console.log('in delete')
    // do api call
    const data = yield fetch('/data.json',
      {method: 'DELETE',
        headers: {
                'Content-Type': 'application/json',
              },
        body: JSON.stringify({'id': goalId,})
      })
    .then(data => data.json())
    yield put({type: 'GET_GOALS'}) // after delete what do you action do you want to perform?
  } catch (e) {
    console.log(e)
  }
}

function* checkGoal(action) {
  const goal = action.payload.goal
  const isCompleted = action.payload.isCompleted
  try {
    // do api call
    const data = yield fetch('/data.json',
      {method: 'PUT',
        headers: {
                  'Content-Type': 'application/json',
                },
        body: JSON.stringify({'id': goal.id, 'text': goal.text, 'completed': isCompleted})
      }
    ) // add type of request and json body
    .then(data => data.json())
    yield put({type: 'GOALS_CHECKED'})
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
