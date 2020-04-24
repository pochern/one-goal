import React from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import dateFormat from 'dateformat'
import Button from '@material-ui/core/Button'

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
      <Typography variant='body1' gutterBottom={true}>
        You have no goal set for today.
      </Typography>
      <Button variant='contained' color='secondary' size='large'>
        ADD GOAL
      </Button> 
    </div>
  )
}
