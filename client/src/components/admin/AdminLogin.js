import React, { useContext, useState } from 'react';
import './admin.css';
import alertContext from '../../context/alert/alertContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

	let navigate = useNavigate();

	const contextAlert = useContext(alertContext);
	const { showAlert } = contextAlert;

	const [credentials, setCredentials] = useState({ username: '', password: '' });

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		const response = await fetch('http://localhost:5000/admin/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({ username: credentials.username, password: credentials.password })
		});
		const json = await response.json();

		if (json.success) {
			localStorage.setItem('adminToken', json.authToken);
			navigate('/admin/menu');
			showAlert('success', 'ADMIN logged in.');
		} else {
			showAlert('danger', 'Admin authentication failed.')
		}

	}




	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	}

	return (
		<>
			<form onSubmit={handleOnSubmit} className='form roboto w-25 m-auto border rounded border-danger my-5 p-4'>
				<h1 className='text-center'>ADMIN <i className="fa-solid fa-triangle-exclamation"></i></h1>
				<div className="form-floating my-3">
					<input type="text" className="form-control" id="username" name='username' onChange={onChange} value={credentials.username} placeholder="User name" />
					<label htmlFor="username">User name</label>
				</div>
				<div className="form-floating">
					<input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credentials.password} placeholder="Password" />
					<label htmlFor="password">Password</label>
				</div>
				<button type='submit' className='btn btn-outline-danger btn-sm my-3'>Log In</button>
			</form>
		</>
	)
}

export default Admin