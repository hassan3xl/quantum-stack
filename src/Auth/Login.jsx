import React, {useState} from 'react';
import {login, register} from '../services/api';
import {useNavigate} from 'react-router-dom';

const Login = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});
	const [isRegister, setIsRegister] = useState(false); // Toggle between login and register
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData({...formData, [name]: value});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (isRegister) {
				// Handle registration
				const response = await register(formData);
				console.log('Registration successful:', response.data);
				setError(null);
				setIsRegister(false); // Switch back to login after successful registration
			} else {
				// Handle login
				const response = await login(formData);
				localStorage.setItem('accessToken', response.data.access);
				localStorage.setItem('refreshToken', response.data.refresh);
				localStorage.setItem('username', formData.username); // Store username
				navigate('/dashboard');
			}
		} catch (err) {
			setError(
				isRegister
					? 'Registration failed. Please try again.'
					: 'Invalid username or password',
			);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<form
				className="bg-white p-6 rounded shadow-md w-full max-w-sm"
				onSubmit={handleSubmit}>
				<h2 className="text-xl font-bold mb-4">
					{isRegister ? 'Register' : 'Login'}
				</h2>
				{error && <p className="text-red-500 text-sm mb-2">{error}</p>}

				{/* Email Field (Only for Registration) */}

				{/* Username Field */}
				<input
					type="text"
					name="username"
					value={formData.username}
					onChange={handleChange}
					placeholder="Username"
					className="w-full p-2 border rounded mb-4"
					required
				/>

				{/* Password Field */}
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					placeholder="Password"
					className="w-full p-2 border rounded mb-4"
					required
				/>

				{/* Submit Button */}
				<button className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4">
					{isRegister ? 'Register' : 'Login'}
				</button>

				{/* Toggle Button */}
				<p className="text-center text-sm text-gray-600">
					{isRegister
						? 'Already have an account? '
						: 'Don’t have an account? '}
					<button
						type="button"
						onClick={() => setIsRegister(!isRegister)}
						className="text-blue-500 hover:text-blue-700">
						{isRegister ? 'Login here' : 'Register here'}
					</button>
				</p>
			</form>
		</div>
	);
};

export default Login;
