import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '360px',
    borderRadius: '10px',
  },
}));

export default function Visual() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
      <div
        style={{
          fontSize: '2rem',
          marginBottom: '20px',
          marginTop: '20px',
          fontFamily: 'Quicksand , sans-serif',
          fontSize: '36px',
        }}
      >
        Incident Visuals
      </div>
        <Grid container spacing={3}>
          <Grid item lg={4} style={{ textAlign: 'center' }}>
            <Paper className={classes.paper}>
              <Typography
                variant="h5"
                style={{ marginBottom: '15px', marginTop: '10px' }}
              >
                Physical Dist. Violations
              </Typography>
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
          <Grid item lg={4}>
            <Paper className={classes.paper}>
              <Typography
                variant="h5"
                style={{ marginBottom: '15px', marginTop: '10px' }}
              >
                Physical Dist. Violations
              </Typography>
              <iframe
                width="98%"
                height="235"
                src={video1}
                frameborder="0"
                controls
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
            <Paper className={classes.paper}>
              <Typography
                variant="h5"
                style={{ marginBottom: '15px', marginTop: '10px' }}
              >
                Physical Dist. Violations
              </Typography>
              <iframe
                width="98%"
                height="235"
                src={video1}
                frameborder="0"
                controls
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
          <Grid item lg={4}>
            <Paper className={classes.paper}>
              <Typography
                variant="h5"
                style={{ marginBottom: '15px', marginTop: '10px' }}
              >
                Physical Dist. Violations
              </Typography>
              <iframe
                width="98%"
                height="235"
                src={video1}
                frameborder="0"
                controls
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
          <Grid item lg={4}>
            <Paper className={classes.paper}>
              <Typography
                variant="h5"
                style={{ marginBottom: '15px', marginTop: '10px' }}
              >
                Physical Dist. Violations
              </Typography>
              <iframe
                width="98%"
                height="235"
                src={video1}
                frameborder="0"
                controls
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
            <Paper className={classes.paper}>
              <Typography
                variant="h5"
                style={{ marginBottom: '15px', marginTop: '10px' }}
              >
                Physical Dist. Violations
              </Typography>
              <iframe
                width="98%"
                height="235"
                src={video1}
                frameborder="0"
                controls
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
            <Paper className={classes.paper}>
              <Typography
                variant="h5"
                style={{ marginBottom: '15px', marginTop: '10px' }}
              >
                Physical Dist. Violations
              </Typography>
              <iframe
                width="98%"
                height="235"
                src={video1}
                frameborder="0"
                controls
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
            <Paper className={classes.paper}>
              <Typography
                variant="h5"
                style={{ marginBottom: '15px', marginTop: '10px' }}
              >
                Physical Dist. Violations
              </Typography>
              <iframe
                width="98%"
                height="235"
                src={video1}
                frameborder="0"
                controls
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
            <Paper className={classes.paper}>
              <Typography
                variant="h5"
                style={{ marginBottom: '15px', marginTop: '10px' }}
              >
                Physical Dist. Violations
              </Typography>
              <iframe
                width="98%"
                height="235"
                src={video1}
                frameborder="0"
                controls
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
            <Paper className={classes.paper}>
              <Typography
                variant="h5"
                style={{ marginBottom: '15px', marginTop: '10px' }}
              >
                Physical Dist. Violations
              </Typography>
              <iframe
                width="98%"
                height="235"
                src={video1}
                frameborder="0"
                controls
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
    </div>
  );
}
