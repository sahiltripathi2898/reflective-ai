import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { Paper, List, ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '300px',
    marginTop: '50px',
    marginBottom: '50px',
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function SpacingGrid() {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:960px)');
  const divHeight = matches ? '300px' : '700px';

  return (
    <div style={{ padding: '20px' }}>
      <Paper
        elevation={8}
        style={{ width: '100%', borderRadius: '10px', height: divHeight }}
      >
        <Grid container className={classes.root} spacing={5} justify="center">
          <Grid item md={5} xs={12} style={{ textAlign: 'center' }}>
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
          </Grid>
          <Grid item md={3} xs={6}>
            <div
              style={{
                fontSize: '25px',
                margin: '7px 0px 7px 0px',
                textAlign: 'center',
                color: '#8bc34a',
                fontWeight: '600',
                letterSpacing: '0.8px',
              }}
            >
              Workers Entering
            </div>
            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
              Worker ID and Company ID
            </div>

            <List style={{ maxHeight: 170, overflow: 'auto' }}>
              <ListItem>Sahil</ListItem>
              <ListItem>Sahil</ListItem>
              <ListItem>Sahil</ListItem>
              <ListItem>Sahil</ListItem>
              <ListItem>Sahil</ListItem>
              <ListItem>Sahil</ListItem>
            </List>
          </Grid>{' '}
          <Grid
            item
            md={3}
            xs={6}
            style={{
              marginRight: '0px',
            }}
          >
            <div
              style={{
                fontSize: '25px',
                margin: '7px 0px 7px 0px',
                textAlign: 'center',
                color: '#ff9100',
                fontWeight: '600',
                letterSpacing: '0.8px',
              }}
            >
              Workers Leaving
            </div>
            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
              Worker ID and Company ID
            </div>

            <List style={{ maxHeight: 170, overflow: 'auto' }}>
              <ListItem>Sahil</ListItem>
              <ListItem>Sahil</ListItem>
              <ListItem>Sahil</ListItem>
              <ListItem>Sahil</ListItem>
              <ListItem>Sahil</ListItem>
              <ListItem>Sahil</ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
