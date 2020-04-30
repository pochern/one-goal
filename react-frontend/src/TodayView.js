import React, {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import dateFormat from 'dateformat'
import { useSelector, useDispatch } from 'react-redux'
import { getGoals } from './actions/index'
import TodayGoal from './TodayGoal'

const useStyles = makeStyles({
  root: {
    display: 'inline-block'
  },
});

export default function TodayView(){
  const now = new Date();
  const dateToday = dateFormat(now, "mmmm d, yyyy")
  const classes = useStyles()

  return(
    <div className={classes.root}>
      <Typography variant='h3'>
        Today
      </Typography>
      <Typography variant='h3' gutterBottom={true}>
        {dateToday}
      </Typography>
      <TodayGoal />
    </div>
  )
}
