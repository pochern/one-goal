import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Calendar from 'react-calendar'
import './CalendarView.css'
//import 'react-calendar/dist/Calendar.css'

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

  return(
    <div>
      <Calendar />
    </div>
  )  
}
