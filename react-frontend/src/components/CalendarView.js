import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import Calendar from 'react-calendar'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import dateFormat from 'dateformat'
import './CalendarView.css'

const useStyles = makeStyles((theme) => ({
  chip: {
    marginLeft: '10px'
  },
  flex: {
    display: 'flex'
  },
  root: {
    marginTop: '30px'
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    borderTop: '0',
    borderRight: '0',
    borderLeft: '0'
  },
  button: {
    textTransform: 'none',
    borderRadius: 40
  }
}));

export default function CalendarView(){
  const classes = useStyles()

  const [goalOnDate, setGoalOnDate] = useState('')
  const [completedOnDate, setCompletedOnDate] = useState('')

  const goalReducer = useSelector(state => state.goalReducer)
  const goals = goalReducer.goalList ? goalReducer.goalList : []

  const handleClick = (e) => {
    const dateClicked = dateFormat(e, "mm/dd/yy")
    const found = goals.find(goal => goal.date === dateClicked)
    if (found) {
      setGoalOnDate(found.text)
      found.completed ? setCompletedOnDate('Completed') :setCompletedOnDate('Not completed')
    } else {
      setGoalOnDate('')
      setCompletedOnDate('')
    }
  }

  const showingBody = () => {
    if(goalOnDate === '') {
      return (
        <div className={classes.root}>
          <Typography variant='h5'>No goal</Typography>
        </div>)
    } else {
      return(
        <div className={classes.root}>
          <Typography variant='h5'>Goal</Typography>
          <div className={classes.flex}>
            <Typography variant='h6'>{goalOnDate}</Typography>
            <Chip
              color={completedOnDate==='Completed'
                ? 'default'
                : 'secondary'}
              className={classes.chip}
              label={completedOnDate} />
          </div>
        </div>)
    }
  }

  return(
    <div>
      <Calendar
        onClickDay={e => handleClick(e)}/>
      <Divider className={classes.root}/>
      {showingBody(goalOnDate)}
    </div>
  )  
}
