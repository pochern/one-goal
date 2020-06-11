import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getGoals } from '../actions/index'
import AppContent from './AppContent'
import LogoAppBar from './LogoAppBar'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGoals())
  }, [])

  return (
    <div>
      <LogoAppBar />
		  <AppContent />
    </div>
  );
}

export default App;
