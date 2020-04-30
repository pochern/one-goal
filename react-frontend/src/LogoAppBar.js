import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex'
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

export default function LogoAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='fixed' color='inherit' variant='outlined' className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            One Goal
          </Typography>
          <Button variant='contained' color="secondary" className={classes.button} disableElevation>Sign out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
