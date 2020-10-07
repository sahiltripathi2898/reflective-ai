import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '20px',
    marginTop: '100px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  font: {
    fontSize: '36px',
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const matches = useMediaQuery('(min-width:960px)');
  const matchesNew = useMediaQuery('(min-width:550px)');
  const divHeight = matches ? '226px' : '400px';
  const fontHead = matchesNew ? '24px' : '18px';
  const fontCon = matchesNew ? '18px' : '14px';
  const buttonFont = matchesNew ? '' : '10px';

  return (
    <div className={classes.root}>
      <div
        className={classes.font}
        style={{
          color: '#2c387e',
          fontFamily: 'Quicksand , sans-serif',
        }}
      >
        404/2 Building 6
      </div>
      <div
        style={{
          fontSize: '30px',
          color: '#2c387e',
          fontFamily: 'Quicksand , sans-serif',
        }}
      >
        280 Main St.
      </div>
      <Paper
        elevation={6}
        spacing={1}
        style={{
          height: divHeight,
          borderRadius: '10px',
          marginTop: '40px',
          position: 'relative',
        }}
      >
        <Grid
          container
          spacing={3}
          style={{
            position: 'relative',
            padding: '20px',
          }}
        >
          <Grid item md={3} xs={6}>
            <div>
              <div
                style={{
                  position: 'absolute',
                  fontSize: fontCon,
                }}
              >
                Assignee :
              </div>
              <div
                style={{
                  position: 'absolute',
                  marginTop: '30px',
                  fontSize: fontHead,
                  fontWeight: '600',
                }}
              >
                Ryan Jensen
              </div>
              <div
                style={{
                  position: 'absolute',
                  marginTop: '80px',
                  fontSize: fontCon,
                }}
              >
                Days Issue Open :
              </div>
              <div
                style={{
                  position: 'absolute',
                  marginTop: '110px',
                  fontSize: fontHead,
                  fontWeight: '600',
                }}
              >
                4
              </div>
            </div>
          </Grid>
          <Grid item md={3} xs={6}>
            <div style={{ fontSize: '20px' }}>From Date :</div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={3} xs={6}>
            <div style={{ fontSize: '20px' }}>To Date :</div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid
            item
            md={3}
            xs={6}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                marginTop: '60px',
                position: 'relative',
                fontSize: buttonFont,
                textAlign: 'center',
              }}
            >
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
