import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import dateFormat from 'dateformat'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { useSelector, useDispatch } from 'react-redux'
import { getGoals, checkGoal, deleteGoal, addGoal, editGoal } from '../actions/index'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import Card from './Card'
 
const useStyles = makeStyles({
  root: {
    display: 'inline-block'
  },
  delete: {
    marginTop: '20px',
  }
})

export default function HomeView(){
  const now = new Date()
  const dateToday = dateFormat(now, "mmmm d, yyyy")
  const dbDateFormat = dateFormat(now, "mm/dd/yy")
  const classes = useStyles()

	const [open, setOpen] = useState(false)
	const [goalText, setGoalText] = useState('')

  const dispatch = useDispatch()
  const goalReducer = useSelector(state => state.goalReducer)
  const goals = goalReducer.goalList ? goalReducer.goalList : {}

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
    dispatch(checkGoal(event.target.checked, goals[goals.length-1]))
  }

  const handleDelete = () => {
    dispatch(deleteGoal(goals[goals.length-1].id))
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

  const handleEdit = () => {
    dispatch(editGoal(goalText, goals[goals.length-1]))
    setOpen(false)
    setGoalText('')
  }

	const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClickEdit = () => {
    setGoalText(goals[goals.length-1].text)
    setOpen(true)
  }


  const handleClose = () => {
    setOpen(false)
  }

  const handleTextChange = (event) => {
    setGoalText(event.target.value)
  }

  const showingBody = (goals, goalReducer) => {
    if(goalReducer.loading===false && goals.length>0 && goals[goals.length-1].date === dbDateFormat) {
      return(
          <div>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox 
                  checked={goals[goals.length-1].completed}
                  onChange={handleChange} name="checked" />}
                label={<Typography variant="h4">{goals[goals.length-1].text}</Typography>}
              />
            </FormGroup>
            <ButtonGroup size='medium' variant='contained' color="secondary" className={classes.delete}>
              <Button onClick={handleClickEdit}>Edit</Button>
              <Button onClick={handleDelete}>Delete</Button>
            </ButtonGroup>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
							<DialogContent>
								<DialogContentText>
									Edit your goal for today.
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
								<Button onClick={handleEdit} color="primary">
									Confirm
								</Button>
							</DialogActions>
						</Dialog>
       </div>)
    } else if(goalReducer.loading===false && (goals.length===0 || goals[goals.length-1].date !== dbDateFormat)) {
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
        <div>
          <Card />
        </div>
      )
    }
  }

  return(
    <div className={classes.root}>
      {todayText}
      {showingBody(goals, goalReducer)}
    </div>
  )
}
