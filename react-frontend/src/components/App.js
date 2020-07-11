import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getGoals } from '../actions/index'
import AppContent from './AppContent'
import LogoAppBar from './LogoAppBar'
import Login from './Login'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getGoals())
  }, [dispatch])

  const login = useSelector(state => state.goalReducer.loading)

  return (
    <div>
    { login === true ?
      <Login />
      :
      <div>
        <LogoAppBar
          buttonVariant='contained'
          buttonText='Sign out'
          buttonHref='/logout'
        />
        <AppContent />
      </div>
    }
    </div>
  );
}

export default App
