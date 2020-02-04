import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

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
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [goal, setGoal] = useState("");
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // To handle showing "ADD ONE GOAL" button based on if a goal already exists or not
  const handleShow = () => {
  };

  const handleInputChange = e => {
    setGoal(e.target.value);
  };


  return (
    <div>
      <h1 className='custom-body'>Today</h1>
      <Button variant="outlined" color="primary" className={classes.margin} onClick={handleClickOpen}>
        Add One Goal
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Add your goal for today.
          </DialogContentText>
          <TextField
            id="outlined-basic" 
            variant="outlined"
            autoFocus
            value={goal}
            margin="dense"
            fullWidth
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <p>{goal}</p>
    </div>
  )
}
