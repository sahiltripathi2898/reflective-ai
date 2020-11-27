import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';

import Logo from '../components/assets/fullLogo.png';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
		backgroundColor: '#031b33',
		borderRadius: '10px',
		height: '470px',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
		width: '50px',
		height: '50px',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn() {
	const classes = useStyles();
	const history = useHistory();
	const userInitial = {
		email: '',
		password: '',
	};

	const [user, setUser] = useState(userInitial);

	const { email, password } = user;

	const handleInputChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const handleFinalSubmit = (e) => {
		e.preventDefault();
		const headers = {
			'Content-Type': 'application/json',
		};

		var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		if (!email.match(mailformat) && email !== '') {
			window.alert('Please Enter a valid Email ID');
		} else if (email === '' && password === '') {
			window.alert('Please Enter Email ID and Password');
		} else if (email === '') {
			window.alert('Please Enter Email ID');
		} else if (password === '') {
			window.alert('Please Enter Password');
		} else {
			axios
				.post(
					'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/login',
					user,
					{
						headers: headers,
					}
				)
				.then((res) => {
					//console.log(res);
					if (res.data.status === 'success') {
						//console.log(res.data);
						localStorage.setItem('jwt_token', res.data.token);
						localStorage.setItem('company_id', res.data.company_id);
						history.push('/home');
					} else {
						if (res.data.status_code === 401) {
							window.alert('Wrong Password');
						} else {
							window.alert(`User Doesn't Exist`);
						}
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<img
					src={Logo}
					alt="logo"
					width="220px"
					height="80px"
					style={{ borderRadius: '10px', marginBottom: '15px' }}
				></img>
				<Typography component="h1" variant="h5" style={{ color: 'white' }}>
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						id="email"
						placeholder="Email ID"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={handleInputChange}
						value={email}
						style={{
							color: 'white',
							backgroundColor: 'white',
							borderRadius: '10px',
						}}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						name="password"
						placeholder="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleInputChange}
						value={password}
						style={{
							color: 'white',
							backgroundColor: 'white',
							borderRadius: '10px',
						}}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleFinalSubmit}
						style={{ marginBottom: '30px' }}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="/reset" variant="body2" style={{ color: 'white' }}>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link href="/register" variant="body2" style={{ color: 'white' }}>
								{"Don't have an account? Contact Us"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
