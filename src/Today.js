import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getGoals } from './selectors'
import { ADD_GOAL } from './constants'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(3),
  },
}))

export default function Today(props) {

  const {setData, savedGoal} = props
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [goal, setGoal] = useState(null)
  const [newGoal, setNewGoal] = useState('')
  const [goalChecked, setGoalChecked] = useState(false)

  const goals = useSelector(getGoals)
  const dispatch = useDispatch()

  useEffect(() => {
    if(goal == null && savedGoal) // app starts with goal null and if savedGoal is true
      setNewGoal(savedGoal)
  }, [goal, savedGoal])

  useEffect(() => {
    if(goal === newGoal && goal !== '' && newGoal !== '') {
      const updatedData = { 'text': newGoal, 'status': 'Unfinished' }
      // POST request
      fetch('data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      })
      .then((response) => response.json())
      .then((updatedData) => {
        console.log('Success:', updatedData)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    }
  }, [goal, newGoal])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleAdd = (e) => {
    setOpen(false)
    setNewGoal(goal)
    // dispatching action
    dispatch({ type: ADD_GOAL })
  }

  const handleClose = () => {
    setOpen(false)
  }
  
  const handleInputChange = e => {
    setGoal(e.target.value)
  }

  const handleCancel = () => {
    setGoal("")
    setOpen(false)
  }

  const handleEdit = () => {
    setOpen(true)
  }

  const handleChange = () => {
    setGoalChecked(!goalChecked);
  }

  // button variable to hold changes in the body - show goal if set, or show button
  let button
  if (goal !== '') {
    button = 
      <div>
        <Button variant="outlined" color="primary" className={classes.margin} onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="outlined" color="primary" className={classes.margin} onClick={handleCancel}>
          Delete
        </Button>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={goalChecked}
                onChange={handleChange}
                name="goalChecked"
                color="primary"
              />
            }
            label={newGoal}
          />
        </FormGroup>
      </div>
  } else {
    button = <Button variant="outlined" color="primary" className={classes.margin} onClick={handleClickOpen}>
      Add One Goal
    </Button>
  }

  return (
    <div>
      <h1 className='custom-body'>Today</h1>
      {button}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Add your goal for today.
          </DialogContentText>
          <TextField
            id="outlined-basic" 
            variant="outlined"
            autoFocus
            value={(goal) ? goal : ''}
            margin="dense"
            fullWidth
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
