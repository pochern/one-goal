import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { Paper } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { getGoals, checkGoal, deleteGoal } from './actions/index'

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
  const goalReducer = useSelector(state => state.goalReducer)
  const goals = goalReducer.goalList ? goalReducer.goalList : {}

  useEffect(() => {
    dispatch(getGoals())
  }, [])

  useEffect(() => {
    let data = []
    goals.forEach(el => {
      data.push({
        goal: el.text,
        id: el.id,
      })
    })
    setEntries({ data: data })
  }, [])

  const handleDelete = (data) => {
    console.log('handle delete data', data[0])
    dispatch(deleteGoal(data[0].id))
  }

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
					onClick: (evt, data) => {alert(data)}
				},
				{
					tooltip: 'Remove All Selected Goals',
					icon: 'delete',
					onClick: (evt, data) => {handleDelete(data)}
				}
			]}
    /> 
  )
}
