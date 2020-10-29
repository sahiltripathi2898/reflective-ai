import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
//import { useHistory } from 'react-router-dom';

import axios from 'axios';

import Logo from '../components/assets/fullLogo.png'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#031b33',
    borderRadius: '10px',
    height: '590px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  //const history = useHistory();
  const userInitial = {
    first_name: '',
    last_name: '',
    email: '',
    company_name: '',
    role: ''
  };

  const [visform, setvisform] = useState('')
  const [msg, setmsg] = useState('hidden')

  const [user, setUser] = useState(userInitial);

  const { first_name, last_name, email, company_name, role } = user;

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = (e) => {
    console.log(user);
    e.preventDefault();

    axios
      .post(
        'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/contact',
        user
      )
      .then((res) => {
        console.log(res.data);
        setvisform('hidden')
        setmsg('')
        //history.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} style={{ visibility: visform }}>
        <img src={Logo} alt="logo" width="220px" height="80px" style={{ borderRadius: '10px', marginBottom: '15px' }}></img>
        <Typography component="h1" variant="h5" style={{ color: 'white' }}>
          Contact Us
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="first_name"
                name="first_name"
                variant="outlined"
                placeholder="First Name"
                fullWidth
                id="firstName"
                autoFocus
                value={first_name}
                onChange={handleInputChange}
                style={{ color: 'white', backgroundColor: 'white', borderRadius: '10px' }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                placeholder="Last Name"
                fullWidth
                id="lastName"
                name="last_name"
                autoComplete="last_name"
                value={last_name}
                onChange={handleInputChange}
                style={{ color: 'white', backgroundColor: 'white', borderRadius: '10px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                placeholder="Email ID"
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleInputChange}
                style={{ color: 'white', backgroundColor: 'white', borderRadius: '10px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                placeholder="Company Name"
                fullWidth
                name="company_name"
                id="company_name"
                value={company_name}
                onChange={handleInputChange}
                style={{ color: 'white', backgroundColor: 'white', borderRadius: '10px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                placeholder="Role"
                fullWidth
                name="role"
                id="role"
                value={role}
                onChange={handleInputChange}
                style={{ color: 'white', backgroundColor: 'white', borderRadius: '10px' }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleFinalSubmit}
          >
            Contact Us
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2" style={{ color: 'white' }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <div style={{ visibility: msg, position: 'fixed', top: '160px', marginLeft: '36px' }}>
        <Typography variant="h2" style={{ textAlign: 'center', marginTop: '30px', marginBottom: '10px', fontWeight: '600', letterSpacing: '1px' }}>
          Thank You !
        </Typography>
        <Typography variant="h6" style={{ textAlign: 'center' }}>
          We will contact you shortly .
        </Typography>
      </div>
    </Container>
  );
}
