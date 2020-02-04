import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Today() {
  const classes = useStyles();

  return (
    <div>
      <h1 className='custom-body'>Today</h1>
      <Button variant="outlined" size="medium" color="primary" className={classes.margin}>
        Add One Goal
      </Button>
    </div>
  )
}
