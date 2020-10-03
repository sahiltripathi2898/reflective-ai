import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '20px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '350px',
  },
}));

export default function Visual() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
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
        Visuals
      </div>
      <Grid container spacing={3}>
        <Grid item md={4} style={{ textAlign: 'center' }}>
          <Paper className={classes.paper}>
            <iframe
              width="95%"
              height="265"
              src="https://www.youtube.com/embed/UjtOGPJ0URM"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="video"
              style={{
                borderRadius: '5px',
                display: 'inline-block',
                margin: '0 auto',
              }}
            ></iframe>
            <div
              style={{
                textAlign: 'centre',
                fontSize: '26px',
                marginTop: '10px',
              }}
            >
              Details about it
            </div>
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper className={classes.paper}>
            <iframe
              width="95%"
              height="265"
              src="https://www.youtube.com/embed/sNhhvQGsMEc"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="video"
              style={{
                borderRadius: '5px',
                display: 'inline-block',
                margin: '0 auto',
              }}
            ></iframe>{' '}
            <div
              style={{
                textAlign: 'centre',
                fontSize: '26px',
                marginTop: '10px',
              }}
            >
              Details about it
            </div>
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper className={classes.paper}>
            <iframe
              width="95%"
              height="265"
              src="https://www.youtube.com/embed/UjtOGPJ0URM"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="video"
              style={{
                borderRadius: '5px',
                display: 'inline-block',
                margin: '0 auto',
              }}
            ></iframe>{' '}
            <div
              style={{
                textAlign: 'centre',
                fontSize: '26px',
                marginTop: '10px',
              }}
            >
              Details about it
            </div>
          </Paper>
        </Grid>
        <Grid item md={4} style={{ textAlign: 'center' }}>
          <Paper className={classes.paper}>
            <iframe
              width="95%"
              height="265"
              src="https://www.youtube.com/embed/sNhhvQGsMEc"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="video"
              style={{
                borderRadius: '5px',
                display: 'inline-block',
                margin: '0 auto',
              }}
            ></iframe>
            <div
              style={{
                textAlign: 'centre',
                fontSize: '26px',
                marginTop: '10px',
              }}
            >
              Details about it
            </div>
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper className={classes.paper}>
            <iframe
              width="95%"
              height="265"
              src="https://www.youtube.com/embed/qJNO1X4VJoc"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="video"
              style={{
                borderRadius: '5px',
                display: 'inline-block',
                margin: '0 auto',
              }}
            ></iframe>{' '}
            <div
              style={{
                textAlign: 'centre',
                fontSize: '26px',
                marginTop: '10px',
              }}
            >
              Details about it
            </div>
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper className={classes.paper}>
            <iframe
              width="95%"
              height="265"
              src="https://www.youtube.com/embed/UjtOGPJ0URM"
              frameborder="0"
              allow="autoplay; encrypted-media"
              allowfullscreen
              title="video"
              style={{
                borderRadius: '5px',
                display: 'inline-block',
                margin: '0 auto',
              }}
            ></iframe>{' '}
            <div
              style={{
                textAlign: 'centre',
                fontSize: '26px',
                marginTop: '10px',
              }}
            >
              Details about it
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
