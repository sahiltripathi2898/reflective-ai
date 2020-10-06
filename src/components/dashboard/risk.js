import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { FaArrowUp } from 'react-icons/fa';

//Resposive text
import Typography from '@material-ui/core/Typography';

//images
import ppe from './assets/ppe.png';
import crowd from './assets/crowd.jpeg';
import mw from './assets/mw.jpeg';
import sd from './assets/sd.jpeg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '20px',
  },
  paper: {
    padding: theme.spacing(4),
    color: 'black',
    height: '220px',
    borderRadius: '10px',
    padding: '30px 20px 30px 20px',
  },
}));

export default function Risk() {
  const classes = useStyles();

  const matches = useMediaQuery('(min-width:700px)');
  const floatPic = matches ? 'right' : 'right';
  const paperHeight = matches ? '220px' : '270px';

  return (
    <div className={classes.root}>
      <div
        style={{
          fontSize: '2rem',
          marginBottom: '20px',
          marginTop: '20px',
          fontFamily: 'revert',
          fontWeight: '600',
        }}
      >
        Risk Factors
      </div>
      <Grid container spacing={3}>
        <Grid item lg={6} xs={12} md={6}>
          <Paper className={classes.paper} style={{ height: paperHeight }}>
            <div
              style={{
                float: 'left',
                fontSize: '24px',
                fontWeight: '500',
                width: '70%',
              }}
            >
              <Typography variant="h5"> PPE Violations</Typography>
              <Typography
                variant="h4"
                style={{
                  color: '#33f266',
                  margin: '3px 0px 3px 0px',
                  fontWeight: '600',
                }}
              >
                None
              </Typography>
              <div
                style={{
                  color: '#33f266s',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              ></div>
            </div>
            <div style={{ float: floatPic, width: '30%', right: '0' }}>
              <img
                alt="risk-images"
                src={ppe}
                width="70px"
                height="70px"
                style={{ float: floatPic }}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item lg={6} xs={12} md={6}>
          <Paper className={classes.paper} style={{ height: paperHeight }}>
            <div
              style={{
                float: 'left',
                fontSize: '24px',
                fontWeight: '500',
                width: '70%',
              }}
            >
              <Typography variant="h5">
                Physical Distancing Violations
              </Typography>

              <div
                style={{
                  color: 'orange',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              >
                17
              </div>
              <div
                style={{
                  color: 'orange',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              >
                16.66 % <FaArrowUp />
              </div>
            </div>
            <div style={{ float: floatPic, width: '30%' }}>
              <img
                alt="risk-images"
                src={sd}
                width="70px"
                height="70px"
                style={{ float: floatPic }}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item lg={6} xs={12} md={6}>
          <Paper className={classes.paper} style={{ height: paperHeight }}>
            <div
              style={{
                float: 'left',
                fontSize: '24px',
                fontWeight: '500',
                width: '70%',
              }}
            >
              <Typography variant="h5">Crowding Violations</Typography>

              <div
                style={{
                  color: '#33f266',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              >
                0
              </div>
              <div
                style={{
                  color: '#33f266',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              >
                0 % <FaArrowUp />
              </div>
            </div>
            <div style={{ float: floatPic, width: '30%' }}>
              <img
                alt="risk-images"
                src={crowd}
                width="70px"
                height="70px"
                style={{ float: floatPic }}
              />
            </div>
          </Paper>
        </Grid>
        <Grid item lg={6} xs={12} md={6}>
          <Paper className={classes.paper} style={{ height: paperHeight }}>
            <div
              style={{
                float: 'left',
                fontSize: '24px',
                fontWeight: '500',
                width: '70%',
              }}
            >
              <Typography variant="h5">Max Worker Count</Typography>
              <div
                style={{
                  color: '#33f266',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              >
                15
              </div>
              <div
                style={{
                  color: '#33f266',
                  margin: '3px 0px 3px 0px',
                  fontSize: '30px',
                  fontWeight: '600',
                }}
              >
                15.38 % <FaArrowUp />
              </div>
            </div>
            <div style={{ float: floatPic, width: '30%' }}>
              <img
                alt="risk-images"
                src={mw}
                width="70px"
                height="70px"
                style={{ float: floatPic }}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
