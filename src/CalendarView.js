import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Calendar } from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

export default function CalendarView(props) {
  const [date, setDate] = useState(new Date())

  const onChange = () => setDate(date)

  return (
    <div>
      <Calendar
      />
    </div>
  )
}
  
  
