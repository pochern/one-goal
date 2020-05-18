import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { Paper } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { checkGoal, deleteGoal } from './actions/index'

export default function UnfinishedGoalsView(){
  const columns = [
    { title: 'Goal', field: 'goal' },
    { title: 'Date', field: 'date' }
  ]

  const dispatch = useDispatch()
  const goalReducer = useSelector(state => state.goalReducer)
  const goals = goalReducer.goalList ? goalReducer.goalList : []
  const data = goals.filter(goal => goal.completed === false).map(goal => ({goal: goal.text, id: goal.id, completed: goal.completed, date: goal.date}))


  const handleChange = (data) => {
    const goalData = {text: data[0].goal, id: data[0].id, completed: data[0].completed}
    dispatch(checkGoal(!data[0].completed, goalData))
  }

  const handleDelete = (data) => {
    dispatch(deleteGoal(data[0].id))
  }


  return(
    <MaterialTable
      title='My Unfinished Goals'
      columns={columns}
      data={data}
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
					onClick: (evt, data) => {handleChange(data)}
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
