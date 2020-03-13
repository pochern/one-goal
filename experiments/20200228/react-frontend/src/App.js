import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';

const useStyles = makeStyles(theme => ({
  root: {
      '& > *': {
            margin: theme.spacing(1),
          },
    },
}));

function App() {
  const classes = useStyles()
  const [value, setValue] = useState('')
  const [newText, setNewText] = useState('')

  // load text from backend using useEffect with fetch GET request 
  // default method=GET
  useEffect(() => {
      fetch('http://localhost/data')  // location on server
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setNewText(data[data.length-1].text); // last JSON obj from array
    });
  }, []); // [] makes it only load once; does not depend on any values changing

  useEffect(() => {
    if(value === newText && value !== '' && newText !== '') {
      console.log('in here')
      const updatedData = { 'text': newText };

      fetch('http://localhost/data', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(updatedData),
      })
      .then((response) => response.json())
      .then((updatedData) => {
        console.log('Success:', updatedData);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }, [newText])

  return (
    <div className="App">
      <form className={classes.root} noValidate autoComplete='off'>
        <TextField id='standard-basic' label='Text' value={value} onChange={(e) => setValue(e.target.value) } />
        <Button variant='contained' onClick={() => setNewText(value)}>Submit</Button>
      </form>
    {newText}
    </div>
  );
}

export default App;
