import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import dateFormat from 'dateformat'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux'
import { getGoals, checkGoal, deleteGoal, addGoal } from './actions/index'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
 
const useStyles = makeStyles({
  root: {
    display: 'inline-block'
  },
})

export default function TodayView(){
  const now = new Date()
  const dateToday = dateFormat(now, "mmmm d, yyyy")
  const classes = useStyles()

	const [open, setOpen] = useState(false)
	const [goalText, setGoalText] = useState('')

  const dispatch = useDispatch()
  const goals = useSelector(state => state.goals)
  const goal = goals.goals ? goals.goals : {}

  useEffect(() => {
    dispatch(getGoals())
  }, [])
  
  const todayText = (
    <div>
      <Typography variant='h3'>
        Today
      </Typography>
      <Typography variant='h3' gutterBottom={true}>
        {dateToday}
      </Typography>
    </div>
  )

  const handleChange = (event) => {
    console.log('today view handle change', goal[goal.length-1])
    dispatch(checkGoal(event.target.checked, goal[goal.length-1]))
  }

  const handleDelete = () => {
    dispatch(deleteGoal(goal[goal.length-1].id))
  }

  const handleAdd = () => {
    dispatch(addGoal(goalText))
    setOpen(false)
    setGoalText('')
  }

  const handleCancel = () => {
    setGoalText('')
    setOpen(false)
  }

	const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleTextChange = (event) => {
    setGoalText(event.target.value)
  }

  const showingBody = (goal, goals) => {
    if(goals.loading===false && goal.length>0) {
      return(
          <div>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox 
                  checked={goal[goal.length-1].completed} 
                  onChange={handleChange} name="checked" />}
                label={goal[goal.length-1].text}
              />
            </FormGroup>
            <Button variant='contained' color='secondary' size='large' onClick={handleDelete}>
              Delete 
            </Button>
        </div>) 
    } else if(goals.loading===false && goal.length===0) {
      return(
          <div>
            <Typography variant='body1' gutterBottom={true}>
              You have no goal set for today.
            </Typography>
            <Button variant='contained' color='secondary' size='large' onClick={handleClickOpen}>
              ADD GOAL
            </Button>
						<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
							<DialogContent>
								<DialogContentText>
									Enter your goal for today.
								</DialogContentText>
								<TextField
								  autoFocus
									margin="dense"
                  value={goalText}
                  onChange={handleTextChange}
									type="text"
									fullWidth
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
        </div>)
    } else {
      return(
        <div></div>
      )
    }
  }

  return(
    <div className={classes.root}>
      {todayText}
      {showingBody(goal, goals)}
    </div>
  )
}
