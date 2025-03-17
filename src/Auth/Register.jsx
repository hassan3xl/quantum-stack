import React, {useState} from 'react';
import {register} from '../services/api';
import {useNavigate} from 'react-router-dom';

const Register = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData({...formData, [name]: value});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await register(formData);
			navigate('/login');
		} catch (err) {
			setError(
				'Registration failed: ' + err.response?.data?.error ||
					'Unknown error',
			);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<form
				className="bg-white p-6 rounded shadow-md w-full max-w-sm"
				onSubmit={handleSubmit}>
				<h2 className="text-xl font-bold mb-4">Register</h2>
				{error && <p className="text-red-500 text-sm mb-2">{error}</p>}
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					placeholder="email"
					className="w-full p-2 border rounded mb-4"
				/>

				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					placeholder="Password"
					className="w-full p-2 border rounded mb-4"
				/>
				<button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
