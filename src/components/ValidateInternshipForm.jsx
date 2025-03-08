import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const ValidateInternshipForm = () => {
	const [internshipId, setInternshipId] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		try {
			const token = localStorage.getItem('accessToken'); // Retrieve JWT token
			const response = await axios.post(
				'http://127.0.0.1:8000/api/validate-internship/',
				{internship_id: internshipId},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			if (response.status === 200) {
				// Redirect to the internship page
				navigate('/internships');
			}
		} catch (error) {
			if (error.response && error.response.data.error) {
				setError(error.response.data.error); // Display error from the server
			} else {
				setError('An unexpected error occurred. Please try again.');
			}
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-4">Enter Internship ID</h1>
			{error && <div className="mb-4 text-red-600">{error}</div>}
			<form onSubmit={handleSubmit} className="grid gap-4">
				<div>
					<label htmlFor="internshipId" className="block font-medium">
						Internship ID
					</label>
					<input
						type="text"
						id="internshipId"
						name="internshipId"
						value={internshipId}
						onChange={(e) => setInternshipId(e.target.value)}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600">
					Submit
				</button>
			</form>
		</div>
	);
};

export default ValidateInternshipForm;
