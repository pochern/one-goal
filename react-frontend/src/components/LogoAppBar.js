import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex'
  },
  title: {
    flexGrow: 1,
  },
  appBarSignIn: {
    zIndex: theme.zIndex.drawer + 1,
    borderTop: '0',
    borderRight: '0',
    borderLeft: '0',
    borderBottom: '0',
  },
  appBarSignOut: {
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

export default function LogoAppBar(props) {
  const classes = useStyles()
  const { buttonHref, buttonVariant, buttonText } = props

  return (
    <div className={classes.root}>
      <AppBar position='fixed'
        color='inherit'
        variant='outlined'
        className={buttonText === 'Sign In' ? classes.appBarSignIn : classes.appBarSignOut}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            One Goal
          </Typography>
          <Button variant={buttonVariant}
            color="secondary"
            className={classes.button}
            disableElevation
            href={buttonHref}
          >
            {buttonText}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
