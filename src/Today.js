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

  const {setData, savedGoal, savedGoalId, savedGoalCompleted} = props
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [goal, setGoal] = useState(null)
  const [goalId, setGoalId] = useState(null)
  const [newGoal, setNewGoal] = useState('')
  const [goalCompleted, setGoalCompleted] = useState(null)
  const [clickedEdit, setClickedEdit] = useState(false)
  const [clickedDelete, setClickedDelete] = useState(false)
  const [clickedCheckbox, setClickedCheckbox] = useState(false)

  const goals = useSelector(getGoals)
  const dispatch = useDispatch()

  useEffect(() => {
    if(goal == null && savedGoal) // app starts with goal null and if savedGoal is true
      setNewGoal(savedGoal)
  }, [goal, savedGoal])

  useEffect(() => {
    if(goalId == null && savedGoalId)
      setGoalId(savedGoalId)
  }, [goalId, savedGoalId])

  useEffect(() => {
    if(goalCompleted == null && savedGoalCompleted)
      setGoalCompleted(savedGoalCompleted)
  }, [goalCompleted, savedGoalCompleted])

  useEffect(() => {
    if(clickedEdit == false && goal === newGoal && goal !== '' && newGoal !== '') {
      const addedData = { 'text': newGoal }
      // POST request
      fetch('data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addedData)
      })
      .then((addedData) => {
        console.log('Success:', addedData)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    }else if(clickedEdit == true && goal === newGoal || clickedCheckbox) {
      const editedData = {
        'id': goalId,
        'text': newGoal,
        'completed': goalCompleted,
      }
      fetch('data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData)
      })
      .then((editedData) => {
        console.log('Success:', editedData)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
      setClickedEdit(false)
      setClickedCheckbox(false)
    }else if(clickedDelete == true) {
      console.log('you clicked delete')
      const editedData = {
        'id': goalId,
        'text': newGoal,
        'completed': false
      }
      fetch('data/'+goalId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((editedData) => {
        console.log('Success:', goalId)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
      setClickedDelete(false)
      setClickedCheckbox(false)
    }
  }, [goal, newGoal, clickedDelete, clickedEdit, clickedCheckbox])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleAdd = (e) => {
    setOpen(false)
    setNewGoal(goal)
    setGoalChecked(false)
    // dispatching action
    dispatch({ type: ADD_GOAL })
  }

  const handleClose = () => {
    setOpen(false)
  }
  
  const handleInputChange = e => {
    setGoal(e.target.value)
  }

  const handleDelete = () => {
    setClickedDelete(true)
  }

  const handleCancel = () => {
    setGoal(null)
    setOpen(false)
  }

  const handleEdit = () => {
    setOpen(true)
    setClickedEdit(true)
  }

  const handleChange = () => {
    setGoalCompleted(!goalCompleted);
    setClickedCheckbox(true)
  }

  // button variable to hold changes in the body - show goal if set, or show button
  let button
  if (goal !== '') {
    button = 
      <div>
        <Button variant="outlined" color="primary" className={classes.margin} onClick={handleEdit}>
          Edit
        </Button>
        <Button variant="outlined" color="primary" className={classes.margin} onClick={handleDelete}>
          Delete
        </Button>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={goalCompleted}
                onChange={handleChange}
                name="goalCompleted"
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
