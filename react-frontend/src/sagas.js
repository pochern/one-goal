import { put, takeLatest } from 'redux-saga/effects'

function* fetchGoals(action) {
  try {
    // do api call
    console.log('doing api call')
    const data = yield fetch('data')
    .then(response => response.json())
    console.log('goal data', data.goals[0].text)
    yield put({type: 'GOALS_RECEIVED', json: data.goals[0].text})
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

