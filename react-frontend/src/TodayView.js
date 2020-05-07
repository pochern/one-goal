import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import dateFormat from 'dateformat'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux'
import { getGoals } from './actions/index'

const useStyles = makeStyles({
  root: {
    display: 'inline-block'
  },
});

export default function TodayView(){
  const now = new Date();
  const dateToday = dateFormat(now, "mmmm d, yyyy")
  const classes = useStyles()

  const dispatch = useDispatch()
  const goals = useSelector(state => state.goals)
  const goal = goals.goals ? goals.goals[0] : {}

  useEffect(() => {
    dispatch(getGoals())
  }, [])

  return(
    !goals.loading  ?
    <div className={classes.root}>
      <Typography variant='h3'>
        Today
      </Typography>
      <Typography variant='h3' gutterBottom={true}>
        {dateToday}
      </Typography>
      <div>
        <Typography variant='body1' gutterBottom={true}>
          You have no goal set for today.
        </Typography>
        <Button variant='contained' color='secondary' size='large'>
          ADD GOAL
        </Button>
        <Typography variant='h1'>
          {goal.text}
        </Typography>
      </div>
    </div> :
    <div></div>
  )
}
