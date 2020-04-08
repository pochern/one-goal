import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Today from './Today'
import CalendarView from './CalendarView'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
  },
}))

const options = [
  'Today',
  'Calendar',
  'Unfinished Goals',
]

export default function SimpleListMenu(props) {
  const classes = useStyles()
  const {setData, savedGoal, savedGoalId, savedGoalCompleted} = props
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [appView, setAppView] = useState(null)
  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect( () => {
    if (selectedIndex === 0) {
      setAppView(<Today setData={setData} savedGoalId={savedGoalId} savedGoal={savedGoal} savedGoalCompleted={savedGoalCompleted}/>)
    }
    else if (selectedIndex === 1)
      setAppView(<CalendarView setData={setData} savedGoal={savedGoal}/>)
  }, [selectedIndex, savedGoal, savedGoalId, savedGoalCompleted])
  
  return (
    <div className={classes.root}>
      <List component='nav'>
        <ListItem
          button
          aria-haspopup='true'
          aria-controls='lock-menu'
          onClick={handleClickListItem}
        >
          <ListItemText primary={options[selectedIndex]} />
          <ArrowDropDownIcon />
        </ListItem>
      </List>
      <Menu
        id='lock-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={event => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      {appView}
    </div>
  )
}
