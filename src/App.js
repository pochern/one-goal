import React, { useState, useEffect } from 'react';
import './App.css';
import SimpleListMenu from './SimpleListMenu'

const theme = {};

function App() { 
  const [goalData, setGoalData] = useState('');
	useEffect(() => {
    fetch('data')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      setGoalData(data.goals[data.goals.length-1].text)
    })
	}, [])

  return (
    <div className = 'App'>
      <SimpleListMenu setData={setGoalData} savedGoal={(goalData!=='') && goalData}/>
    </div>
  
  );
}

export default App;
