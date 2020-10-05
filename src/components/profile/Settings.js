import React, { Component, useState } from 'react';

import {
  Paper,
  Container,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
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
    <div style={{ marginTop: '100px', padding: '30px' }}>
      <Paper
        elevation={8}
        style={{ position: 'absolute', borderRadius: '10px' }}
      >
        <div style={{ position: 'relative', margin: '20px 0px 20px 0px' }}>
          <Typography variant="h4" style={{ textAlign: 'center' }}>
            Profile Settings
          </Typography>
        </div>
        <div style={{ position: 'relative', padding: '30px' }}>
          <form className={classes.root}>
            <div>
              <TextField
                id="outlined-basic"
                label="First Name"
                variant="outlined"
                name="fname"
                value={fname}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                name="lname"
                value={lname}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                name="address"
                value={address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                name="city"
                value={city}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-basic"
                label="Country"
                variant="outlined"
                name="country"
                value={country}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-basic"
                label="Zip"
                variant="outlined"
                name="zip"
                value={zip}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Job Title"
                variant="outlined"
                name="job"
                value={job}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-basic"
                label="Cell Phone"
                variant="outlined"
                name="phone"
                value={phone}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-basic"
                label="Company"
                variant="outlined"
                name="company"
                value={company}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
        <div style={{ margin: '0px 0px 20px 32px' }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleFinalSubmit}
          >
            Update Profile
          </Button>
        </div>
      </Paper>
    </div>
  );
}
