import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import React from 'react'
import Button from '@material-ui/core/Button'
import LogoAppBar from './LogoAppBar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: '25px',
  },
  content: {
    padding: theme.spacing(3),
  },
  title: {
    fontWeight: '400',
    marginTop: '15%',
  },
  subtitle: {
    color: '#707070',
  },
}))

export default function Login() {
  const classes = useStyles()

  
  return(
    <div>
      <LogoAppBar 
        buttonVariant='outlined' 
        buttonText='Sign In'
        buttonHref='/login'
      />
      <div className={classes.content}>
        <Typography variant='h2' className={classes.title} gutterBottom>
          One Goal for Business
        </Typography>
        <Typography variant='h6' className={classes.subtitle}>
          One account designed for your stand-up goal needs
        </Typography>
        <Button variant='contained' color='secondary' className={classes.button} size='large'>
          Get Started
        </Button>
      </div>
    </div>
  )
}
