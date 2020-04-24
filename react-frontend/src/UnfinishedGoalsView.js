import React from 'react'
import MaterialTable from 'material-table'
import { Paper } from '@material-ui/core'

export default function UnfinishedGoalsView(){
  return(
    <MaterialTable
      title='My Unfinished Goals'
      columns={[
        { title: 'Goal', field: 'goal' },
        { title: 'Date', field: 'date' },
      ]}
      data={[
        { date: '4/23/2020', goal: 'Go ice skating'},
        { date: '4/24/2020', goal: 'Go swimming'},
      ]}        
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
    /> 
  )
}
