import React, { useState, useEffect } from 'react'
import MaterialTable from 'material-table'
import { Paper } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { checkGoal, deleteGoal } from '../actions/index'

export default function UnfinishedGoalsView(){
  const columns = [
    { title: 'Goal', field: 'goal' },
    { title: 'Date created', field: 'date' }
  ]

  const dispatch = useDispatch()
  const goalReducer = useSelector(state => state.goalReducer)
  const goals = goalReducer.goalList ? goalReducer.goalList : []
  const data = goals.filter(goal => goal.completed === false).map(goal => ({goal: goal.text, id: goal.id, completed: goal.completed, date: goal.date}))


  const handleChange = (data) => {
    data.map(el => dispatch(checkGoal(!el.completed, {text: el.goal, id: el.id, completed: el.completed})))
  }

  const handleDelete = (data) => {
    data.map(el => dispatch(deleteGoal(el.id)))
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
