import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { Paper } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { getGoals, checkGoal } from './actions/index'

export default function UnfinishedGoalsView(){
  const [entries, setEntries] = useState({
    data: [
      {
        goal: "",
      }
    ]
  })

  const [state] = useState({
    columns: [
      { title: 'Goal', field: 'goal', }
    ],
  })

  const dispatch = useDispatch()
  const goals = useSelector(state => state.goals)
  const goal = goals.goals ? goals.goals : {}

  useEffect(() => {
    dispatch(getGoals())
  }, [])

  useEffect(() => {
    let data = []
    goal.forEach(el => {
      data.push({
        goal: el.text,
      })
    })
    setEntries({ data: data })
  }, [])

  return(
    <MaterialTable
      title='My Unfinished Goals'
      columns={state.columns}
      data={entries.data}
      options={{
        selection: true,
        headerStyle: {
          fontWeight: 'bold',
          fontSize: '1em'
        }
      }}
      components={{
        Container: props => <Paper {...props} elevation={0}/>
      }}
			actions={[
				{
					tooltip: 'Mark All Selected Goals Completed',
					icon: 'done',
					onClick: (evt, data) => alert('You want to mark completed ' + data.length + ' rows')
				},
				{
					tooltip: 'Remove All Selected Goals',
					icon: 'delete',
					onClick: (evt, data) => alert('You want to delete ' + JSON.stringify(data) + ' rows')
				}
			]}
    /> 
  )
}
