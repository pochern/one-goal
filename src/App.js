import React, { useState, useEffect } from 'react';
import './App.css';
import SimpleListMenu from './SimpleListMenu'

const theme = {}

function App() { 
  const [goalData, setGoalData] = useState('')
  const [allGoals, setAllGoals] = useState('')
  const [unfinishedGoals, setUnfinishedGoals] = useState('')
	useEffect(() => {
    fetch('data')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      setGoalData(data.goals[data.goals.length-1].text)
      setAllGoals(data.goals)
      setUnfinishedGoals(data.goals.filter(goal => goal.status === 'Unfinished'))
    })
	}, [])

  return (
    <div className = 'App'>
      <SimpleListMenu 
        unfinishedSavedGoals={(unfinishedGoals!=='') && unfinishedGoals} 
        savedGoal={(goalData!=='') && goalData}
        allSavedGoals={(allGoals!=='' && allGoals)}
      />
    </div>
  
  );
}

export default App;
