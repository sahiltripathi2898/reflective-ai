import React from 'react';
import { Redirect } from 'react-router-dom';

function ProtectedRoute(props) {
	const component = props.cmp;
	var auth = localStorage.getItem('jwt_token');
	return <div>{auth ? component : <Redirect to="" />}</div>;
}

export default ProtectedRoute;
