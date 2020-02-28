import React, { useState, useEffect } from 'react';
import './App.css';
import SimpleListMenu from './SimpleListMenu'

const theme = {};

function App() { 
  const [data, setData] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/forms/abc.json');
			const json = await response.json();
      setData(json);
		};
		fetchData();
	}, []);

  return (
    <div className = 'App'>
      <SimpleListMenu savedGoal={data.goal}/>
    </div>
  
  );
}

export default App;
