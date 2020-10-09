import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

import { Typography, TextField, Button } from '@material-ui/core';
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

  const [first_name, setFirst] = useState('');
  const [last_name, setLast] = useState('');
  const [email_address, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [job_title, setJob] = useState('');
  const [phone_no, setPhone] = useState('');
  const [company, setCompany] = useState('');

  const firstchange = (e) => {
    setFirst(e.target.value);
  };

  const lastchange = (e) => {
    setLast(e.target.value);
  };

  const emailchange = (e) => {
    setEmail(e.target.value);
  };

  const addresschange = (e) => {
    setAddress(e.target.value);
  };

  const citychange = (e) => {
    setCity(e.target.value);
  };

  const countrychange = (e) => {
    setCountry(e.target.value);
  };

  const zipchange = (e) => {
    setZip(e.target.value);
  };

  const jobchange = (e) => {
    setJob(e.target.value);
  };
  const companychange = (e) => {
    setCompany(e.target.value);
  };
  const phonechange = (e) => {
    setPhone(e.target.value);
  };

  const userDetail = {
    first_name: first_name,
    last_name: last_name,
    email_address: email_address,
    address: address,
    zip: zip,
    country: country,
    city: city,
    phone_no: phone_no,
    job_title: job_title,
    company: company,
  };

  useEffect(() => {
    const data = {
      jwt_token: localStorage.getItem('jwt_token'),
    };
    axios
      .post(
        'http://ec2-13-56-161-17.us-west-1.compute.amazonaws.com:7789/user/me',
        data
      )
      .then((res) => {
        setFirst(res.data.first_name);
        setLast(res.data.last_name);
        setAddress(res.data.address);
        setEmail(res.data.email_address);
        setCountry(res.data.country);
        setZip(res.data.zip);
        setCity(res.data.city);
        setJob(res.data.job_title);
        setPhone(res.data.phone_no);
        setCompany(res.data.company);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const userUpdated = {
      ...userDetail,
      jwt_token: localStorage.getItem('jwt_token'),
    };
    console.log(userUpdated);
    axios
      .post(
        'http://ec2-13-56-161-17.us-west-1.compute.amazonaws.com:7789/user/me/update',
        userUpdated
      )
      .then((res) => {
        window.alert('Profile Updated');
      })
      .catch((err) => console.log(err));
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
              name="first_name"
              value={first_name}
              onChange={firstchange}
              Typography="First Name"
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
              name="last_name"
              value={last_name}
              onChange={lastchange}
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
              onChange={addresschange}
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
              Typography="email_address address"
              variant="outlined"
              name="email_address"
              value={email_address}
              onChange={emailchange}
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
              Typography="city"
              variant="outlined"
              name="city"
              value={city}
              onChange={citychange}
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
              Typography="country"
              variant="outlined"
              name="country"
              value={country}
              onChange={countrychange}
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
              Typography="zip"
              variant="outlined"
              name="zip"
              value={zip}
              onChange={zipchange}
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
              Typography="Phone No"
              variant="outlined"
              name="phone_no"
              value={phone_no}
              onChange={phonechange}
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
              name="job_title"
              value={job_title}
              onChange={jobchange}
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
              Typography="company"
              variant="outlined"
              name="company"
              value={company}
              onChange={companychange}
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
