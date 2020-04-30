import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { getGoals } from './actions/index'
import { useSelector, useDispatch } from 'react-redux'

export default function TodayGoal(props) {

  const dispatch = useDispatch()
  const goals = useSelector(state => state.goals)
  useEffect(() => {
    dispatch(getGoals())
  }, [])

  return(
    <div>
      <Typography variant='body1' gutterBottom={true}>
        You have no goal set for today.
      </Typography>
      <Button variant='contained' color='secondary' size='large'>
        ADD GOAL
      </Button>
      <Typography variant='h1'>
        {goals.goals}
      </Typography>
    </div>
  )
}
