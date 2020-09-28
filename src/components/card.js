import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

//Icons
import { BiNoEntry } from 'react-icons/bi';
import { IoIosMan } from 'react-icons/io';
import { BsGraphUp } from 'react-icons/bs';
import { GrStatusInfo } from 'react-icons/gr';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: '20px',
  },
  paper: {
    height: 200,
    width: 280,
    padding: '20px',
  },
}));

export default function SpacingGrid() {
  const classes = useStyles();

  return (
    <div>
      <div
        style={{
          marginLeft: '20px',
          fontSize: '2rem',
          marginBottom: '20px',
          marginTop: '20px',
          fontFamily: 'revert',
          fontWeight: '600',
        }}
      >
        Alerts
      </div>

      <Grid container className={classes.root} spacing={3} justify="left">
        <Grid item>
          <Paper
            className={classes.paper}
            elevation={8}
            style={{ borderRadius: '10px' }}
          >
            <div
              style={{
                color: 'grey',
                fontSize: '24px',
                textAlign: 'center',
                marginBottom: '5px',
              }}
            >
              Unauthorized Entry
            </div>

            <div style={{ color: '#cc252d', fontSize: '40px' }}>1</div>
          </Paper>
        </Grid>
        <Grid item>
          <Paper
            className={classes.paper}
            elevation={8}
            style={{ borderRadius: '10px' }}
          >
            <div
              style={{
                fontSize: '24px',
                color: 'grey',
                textAlign: 'center',
                marginBottom: '5px',
              }}
            >
              Worker Count
            </div>
            <Grid container style={{ marginTop: '0px' }} spacing={9}>
              <Grid item style={{ fontSize: '40px' }}>
                19
              </Grid>
              <Grid item style={{ fontSize: '38px', color: 'red' }}>
                -24.2%
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item>
          <Paper
            className={classes.paper}
            elevation={8}
            style={{ borderRadius: '10px' }}
          >
            <div
              style={{
                fontSize: '24px',
                color: 'grey',
                textAlign: 'center',
                marginBottom: '5px',
              }}
            >
              Yesterdays's Worker Count
            </div>
          </Paper>
        </Grid>
        <Grid item>
          <Paper
            className={classes.paper}
            elevation={8}
            style={{ borderRadius: '10px' }}
          >
            <div
              style={{
                fontSize: '24px',
                color: 'grey',
                textAlign: 'center',
                marginBottom: '5px',
                borderRadius: '10px',
              }}
            >
              Weekly Average
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
