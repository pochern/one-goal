import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import dateFormat from 'dateformat'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux'
import { getGoals, checkGoal, deleteGoal } from './actions/index'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
 
const useStyles = makeStyles({
  root: {
    display: 'inline-block'
  },
})

export default function TodayView(){
  const now = new Date()
  const dateToday = dateFormat(now, "mmmm d, yyyy")
  const classes = useStyles()

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
    dispatch(checkGoal(event.target.checked, goal[goal.length-1]))
  }

  const handleDelete = () => {
    dispatch(deleteGoal(goal[goal.length-1].id))
  }

  const showingBody = (goal, goals) => {
    if(goals.loading===false && goal.length>0) {
      console.log('goal check', goal[goal.length-1].completed)
      return(
        <div className={classes.root}>
          {todayText}
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
          </div>
        </div>) 
    } else if(goals.loading===false && goal.length===0) {
      return(
        <div className={classes.root}>
          {todayText}
          <div>
            <Typography variant='body1' gutterBottom={true}>
              You have no goal set for today.
            </Typography>
            <Button variant='contained' color='secondary' size='large'>
              ADD GOAL
            </Button>
          </div>
        </div>)
    } else {
      return(
        <div></div>
      )
    }
  }

  return(
    <div>
      {showingBody(goal, goals)}
    </div>
  )
}
