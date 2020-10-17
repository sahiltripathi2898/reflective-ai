import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core'

import video1 from './assets/video.mp4';

//Resposive text
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '20px',
    width: '100%'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '290px',
    borderRadius: '10px',
  },
}));

export default function Visual() {
  const classes = useStyles();

  return (
    <Grid container style={{ padding: '20px', marginBottom: '50px' }}>
      <ThemeProvider theme={theme}>
        <div
          style={{
            marginBottom: '20px',
            marginTop: '20px',
            fontFamily: 'Quicksand , sans-serif',
            fontSize: '36px',
          }}
        >
          Incident Visuals
      </div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" style={{ marginTop: '34px', fontWeight: '600' }}>
              Physical Distancing Violations
            </Typography>
          </Grid>
          <Grid item lg={4} style={{ textAlign: 'center' }}>
            <Paper className={classes.paper} elevation={5}>
              <iframe
                width="98%"
                height="235"
                src={video1}
                controls
                frameborder="0"
                allowfullscreen
                title="video"
                style={{
                  borderRadius: '5px',
                  display: 'inline-block',
                  margin: '0 auto',
                }}
              ></iframe>
              <Typography variant="h6">Thu , 02 July 2020 , 5:10:27</Typography>
            </Paper>
          </Grid>
          <Grid item lg={4} style={{ textAlign: 'center' }}>
            <Paper className={classes.paper} elevation={5}>
              <iframe
                width="98%"
                height="235"
                src={video1}
                controls
                frameborder="0"
                allowfullscreen
                title="video"
                style={{
                  borderRadius: '5px',
                  display: 'inline-block',
                  margin: '0 auto',
                }}
              ></iframe>
              <Typography variant="h6">Thu , 02 July 2020 , 5:10:27</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ backgroundColor: 'gray', height: '2px' }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" style={{ marginTop: '34px', fontWeight: '600' }}>
              Mask Violations
            </Typography>
          </Grid>
          <Grid item lg={4} style={{ textAlign: 'center' }}>
            <Paper className={classes.paper} elevation={5}>
              <iframe
                width="98%"
                height="235"
                src={video1}
                controls
                frameborder="0"
                allowfullscreen
                title="video"
                style={{
                  borderRadius: '5px',
                  display: 'inline-block',
                  margin: '0 auto',
                }}
              ></iframe>
              <Typography variant="h6">Thu , 02 July 2020 , 5:10:27</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ backgroundColor: 'gray', height: '2px' }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" style={{ marginTop: '34px', fontWeight: '600' }}>
              PPE Compliance - Hard Hat
            </Typography>
          </Grid>
          <Grid item lg={4} style={{ textAlign: 'center' }}>
            <Paper className={classes.paper} elevation={5}>
              <iframe
                width="98%"
                height="235"
                src={video1}
                controls
                frameborder="0"
                allowfullscreen
                title="video"
                style={{
                  borderRadius: '5px',
                  display: 'inline-block',
                  margin: '0 auto',
                }}
              ></iframe>
              <Typography variant="h6">Thu , 02 July 2020 , 5:10:27</Typography>
            </Paper>
          </Grid>
          <Grid item lg={4} style={{ textAlign: 'center' }}>
            <Paper className={classes.paper} elevation={5}>
              <iframe
                width="98%"
                height="235"
                src={video1}
                controls
                frameborder="0"
                allowfullscreen
                title="video"
                style={{
                  borderRadius: '5px',
                  display: 'inline-block',
                  margin: '0 auto',
                }}
              ></iframe>
              <Typography variant="h6">Thu , 02 July 2020 , 5:10:27</Typography>
            </Paper>
          </Grid>
          <Grid item lg={4} style={{ textAlign: 'center' }}>
            <Paper className={classes.paper} elevation={5}>
              <iframe
                width="98%"
                height="235"
                src={video1}
                controls
                frameborder="0"
                allowfullscreen
                title="video"
                style={{
                  borderRadius: '5px',
                  display: 'inline-block',
                  margin: '0 auto',
                }}
              ></iframe>
              <Typography variant="h6">Thu , 02 July 2020 , 5:10:27</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ backgroundColor: 'gray', height: '2px' }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" style={{ marginTop: '34px', fontWeight: '600' }}>
              PPE Compliance - High Viz Vest
            </Typography>
          </Grid>
          <Grid item lg={4} style={{ textAlign: 'center' }}>
            <Paper className={classes.paper} elevation={5}>
              <iframe
                width="98%"
                height="235"
                src={video1}
                controls
                frameborder="0"
                allowfullscreen
                title="video"
                style={{
                  borderRadius: '5px',
                  display: 'inline-block',
                  margin: '0 auto',
                }}
              ></iframe>
              <Typography variant="h6">Thu , 02 July 2020 , 5:10:27</Typography>
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Grid>
  );
}
