import { put, takeLatest } from 'redux-saga/effects'

function* fetchGoals(action) {
  try {
    // do api call
    console.log('doing api call')
    const data = yield fetch('/data.json')
    .then(response => response.json())
    console.log('goal data', data.goals[0].text)
    yield put({type: 'GOALS_RECEIVED', payload: data.goals})
  } catch (e) {
    console.log(e)
  }
}

function* deleteGoal(action) {
  try {
    // do api call
    console.log('doing api call')
    const data = yield fetch('/data.json/' + action.id, {method: 'DELETE'}) // add type of request and json body
    .then(data => data.json())
    yield put({type: 'GET_GOALS'}) // after delete what do you action do you want to perform?
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
export default function* mySaga() {
  yield takeLatest('GET_GOALS', fetchGoals);
}


export function* deleteSaga() {
  yield takeLatest('DELETE_GOAL', deleteGoal)
}
