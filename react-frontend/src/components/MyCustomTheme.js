import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      footer: {
        borderBottom: '0',
      },
    },
    MuiTypography: {
      gutterBottom: {
        marginBottom: 60,
      },
			h3: {
				color: '#707070'	
			},
			h4: {
				color: 'black'
			},
      body1: {
				color: '#707070'
			},
    },
    MuiButton: {
      sizeLarge: {
        width: '70%',
        padding: '5%',
        borderRadius: 10
      },
    },
  },
});


