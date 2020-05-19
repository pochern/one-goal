import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import Calendar from 'react-calendar'
import dateFormat from 'dateformat'
import './CalendarView.css'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: '100%'
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

  const goalReducer = useSelector(state => state.goalReducer)
  const goals = goalReducer.goalList ? goalReducer.goalList : []

  const handleClick = (e) => {
    const dateClicked = dateFormat(e, "mm/dd/yy")
    const found = goals.find(goal => goal.date === dateClicked)
    if (found) {
      setGoalOnDate(found.text)
    } else {
      setGoalOnDate('')
    }
  }


  return(
    <div>
      <Calendar
        onClickDay={e => handleClick(e)}/>
      <p>{goalOnDate}</p>
    </div>
  )  
}
