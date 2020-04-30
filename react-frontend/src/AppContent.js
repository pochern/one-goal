import React, { useState, useEffect } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import { getGoals } from './actions/index'
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import DateRange from '@material-ui/icons/DateRange';
import EventBusy from '@material-ui/icons/EventBusy';
import TodayView from './TodayView';
import CalendarView from './CalendarView';
import UnfinishedGoalsView from './UnfinishedGoalsView';
import {theme} from './MyCustomTheme'

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(7),
  },
  item: {
    flexDirection: 'column',
    paddingTop: '30px',
    paddingBottom: '30px',
  },
  iconActive: {
    minWidth: '0',
    color: '#000000'
  },
  iconInactive: {
    minWidth: '0',
    color: '#CCCCCC'
  },
  inactive: {
    color: '#CCCCCC'
  },
  active: {
    color: '#000000'
  },
  list: {
    paddingTop: '0',
    paddingBottom: '0'
  },
}));

const handleIcons = (index) => {
  if(index === 0) { return <HomeIcon fontSize='large' color='#CCCCCC'/> }
  if(index === 1) { return <DateRange fontSize='large' /> }
  if(index === 2) { return <EventBusy fontSize='large' /> }
}

const appView = (view) => {
  //use switch
  switch(view) {
    case 0:
      return <TodayView />
    case 1:
      return <CalendarView />
    case 2:
      return <UnfinishedGoalsView />
    default:
      return <TodayView />
  }
}

export default function AppContent() {
  const classes = useStyles();

  const [view, setView] = useState(0)

  const dispatch = useDispatch()
  const goals = useSelector(state => state.goals)
  useEffect(() => {
    dispatch(getGoals())
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root}>
     <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List classes={{padding: classes.list}}>
            {['Home', 'Calendar', 'Unfinished Goals'].map((text, index) => (
              <ListItem 
                divider={index !== 2 ? true : false}
                button 
                onClick={() => view !== index ? setView(index) : null}
                key={text} 
                classes={{root: classes.item}}
              >
                <ListItemIcon 
                  classes={{root: view === index ? classes.iconActive : classes.iconInactive}} 
                  minWidth='0'
                >
                  {handleIcons(index)}
                </ListItemIcon>
                <ListItemText disableTypography primary={text} className={view === index ? classes.active : classes.inactive} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {appView(view)}
     </main>
    </div>
    </ThemeProvider>
  );
}

