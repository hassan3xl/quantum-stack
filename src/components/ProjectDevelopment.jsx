import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {API} from '../services/api';

const ProjectDevelopment = () => {
	const [email, setEmail] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const response = await API.post('submit-project-request/', {
				email,
				title,
				description,
			});
			console.log('Project request submitted:', response.data);
			navigate('/thank-you');
		} catch (err) {
			setError('Failed to submit project request. Please try again.');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container mx-auto my-8 p-4">
			<h2 className="text-3xl font-bold mb-4">Request a Project</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-1">
						Email
					</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Project Title
					</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Project Description
					</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full p-2 border rounded"
						rows="5"
						required
					/>
				</div>
				{error && <p className="text-red-500">{error}</p>}
				<button
					type="submit"
					disabled={loading}
					className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
					{loading ? 'Submitting...' : 'Submit Request'}
				</button>
			</form>
		</div>
	);
};

export default ProjectDevelopment;
