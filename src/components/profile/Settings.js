import React, { Component, useState } from 'react';

import {
  Paper,
  Container,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  Typography: {
    marginLeft: '74px',
    textAlign: 'left',
  },
}));

export default function Settings() {
  const classes = useStyles();

  const userInitial = {
    fname: '',
    lname: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zip: '',
    job: '',
    phone: '',
    company: '',
  };

  const [user, setUser] = useState(userInitial);

  const {
    fname,
    lname,
    email,
    address,
    city,
    country,
    zip,
    job,
    phone,
    company,
  } = user;

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = (e) => {
    console.log(user);
    e.preventDefault();
    fetch('/api', {
      method: 'POST',
      body: JSON.stringify({ user }),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
  };

  return (
    <div
      className={classes.root}
      style={{ marginTop: '60px', padding: '20px' }}
    >
      <div style={{ position: 'relative', margin: '20px 0px 10px 0px' }}>
        <Typography
          variant="h3"
          style={{
            textAlign: 'center',
            fontWeight: '600',
            fontFamily: 'Quicksand,sans-serif',
            marginBottom: '50px',
          }}
        >
          Profile Settings
        </Typography>
      </div>
      <form>
        <Grid
          container
          spacing={3}
          justify="center"
          style={{ textAlign: 'center' }}
        >
          <Grid item sm={6} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <Typography className={classes.Typography} variant="h6">
              First Name
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="fname"
              value={fname}
              onChange={handleInputChange}
              Typography="Name"
              style={{
                padding: '10px',
                verticalAlign: 'middle',
                width: '80%',
              }}
              size="small"
              inputProps={{ style: { backgroundColor: 'white' } }}
            />
          </Grid>
          <Grid item sm={6} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <Typography className={classes.Typography} variant="h6">
              {' '}
              Last Name
            </Typography>
            <TextField
              id="outlined-basic"
              Typography="Last Name"
              variant="outlined"
              name="lname"
              value={lname}
              onChange={handleInputChange}
              style={{
                padding: '10px',
                verticalAlign: 'middle',
                width: '80%',
              }}
              size="small"
              inputProps={{ style: { backgroundColor: 'white' } }}
            />
          </Grid>

          <Grid item sm={6} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <Typography className={classes.Typography} variant="h6">
              Address
            </Typography>
            <TextField
              id="outlined-basic"
              Typography="Address"
              variant="outlined"
              name="address"
              value={address}
              onChange={handleInputChange}
              multiline
              rows={3}
              style={{
                padding: '10px',
                verticalAlign: 'middle',
                width: '80%',
              }}
              size="small"
              inputProps={{ style: { backgroundColor: 'white' } }}
            />
          </Grid>
          <Grid item sm={6} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <Typography className={classes.Typography} variant="h6">
              Email ID
            </Typography>
            <TextField
              id="outlined-basic"
              Typography="Email Address"
              variant="outlined"
              name="email"
              value={email}
              onChange={handleInputChange}
              style={{
                padding: '10px',
                verticalAlign: 'middle',
                width: '80%',
              }}
              size="small"
              inputProps={{ style: { backgroundColor: 'white' } }}
            />
          </Grid>
          <Grid item sm={6} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <Typography className={classes.Typography} variant="h6">
              City
            </Typography>
            <TextField
              id="outlined-basic"
              Typography="City"
              variant="outlined"
              name="city"
              value={city}
              onChange={handleInputChange}
              style={{
                padding: '10px',
                verticalAlign: 'middle',
                width: '80%',
              }}
              size="small"
              inputProps={{ style: { backgroundColor: 'white' } }}
            />
          </Grid>
          <Grid item sm={6} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <Typography className={classes.Typography} variant="h6">
              Country
            </Typography>
            <TextField
              id="outlined-basic"
              Typography="Country"
              variant="outlined"
              name="country"
              value={country}
              onChange={handleInputChange}
              style={{
                padding: '10px',
                verticalAlign: 'middle',
                width: '80%',
              }}
              size="small"
              inputProps={{ style: { backgroundColor: 'white' } }}
            />
          </Grid>
          <Grid item sm={6} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <Typography className={classes.Typography} variant="h6">
              Zip
            </Typography>
            <TextField
              id="outlined-basic"
              Typography="Zip"
              variant="outlined"
              name="zip"
              value={zip}
              onChange={handleInputChange}
              style={{
                padding: '10px',
                verticalAlign: 'middle',
                width: '80%',
              }}
              size="small"
              inputProps={{ style: { backgroundColor: 'white' } }}
            />
          </Grid>
          <Grid item sm={6} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <Typography className={classes.Typography} variant="h6">
              Phone No.
            </Typography>
            <TextField
              id="outlined-basic"
              Typography="Cell Phone"
              variant="outlined"
              name="phone"
              value={phone}
              onChange={handleInputChange}
              style={{
                padding: '10px',
                verticalAlign: 'middle',
                width: '80%',
              }}
              size="small"
              inputProps={{ style: { backgroundColor: 'white' } }}
            />
          </Grid>
          <Grid item sm={6} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <Typography className={classes.Typography} variant="h6">
              Job Title
            </Typography>
            <TextField
              id="outlined-basic"
              Typography="Job Title"
              variant="outlined"
              name="job"
              value={job}
              onChange={handleInputChange}
              style={{
                padding: '10px',
                verticalAlign: 'middle',
                width: '80%',
              }}
              size="small"
              inputProps={{ style: { backgroundColor: 'white' } }}
            />
          </Grid>
          <Grid item sm={6} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
            <Typography className={classes.Typography} variant="h6">
              Company
            </Typography>
            <TextField
              id="outlined-basic"
              Typography="Company"
              variant="outlined"
              name="company"
              value={company}
              onChange={handleInputChange}
              style={{
                padding: '10px',
                verticalAlign: 'middle',
                width: '80%',
              }}
              size="small"
              inputProps={{ style: { backgroundColor: 'white' } }}
            />
          </Grid>
        </Grid>
      </form>
      <div
        style={{
          margin: '20px 0px 100px 32px',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        <Button color="primary" variant="contained" onClick={handleFinalSubmit}>
          Update Profile
        </Button>
      </div>
    </div>
  );
}
