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
		height: '370px',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
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

	const [email, setEmail] = useState('');

	const handleInputChange = (e) => {
		setEmail(e.target.value);
	};

	const handleFinalSubmit = (e) => {
		const data = {
			email_id: email,
		};
		e.preventDefault();

		axios
			.post('https://api.reflective.ai/forget', data)
			.then((res) => {
				console.log(res.data);
				if (res.data.status === 'success') {
					window.alert('Reset Link has been sent to your Email ID');
					history.push('/');
				} else {
					window.alert('Some error occured');
				}
			})
			.catch((err) => {
				console.log(err);
			});
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
					Reset Password
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
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
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleFinalSubmit}
					>
						Send Reset Link
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="/" variant="body2" style={{ color: 'white' }}>
								Login
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
