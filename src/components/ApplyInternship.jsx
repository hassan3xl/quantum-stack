import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {API} from '../services/api';

const ApplyInternship = () => {
	const [email, setEmail] = useState('');
	const [mode, setMode] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const response = await API.post('submit-initial-application/', {
				email,
				mode,
			});
			console.log('Application submitted:', response.data);
			navigate('/thank-you'); // Redirect to a thank-you page
		} catch (err) {
			setError('Failed to submit application. Please try again.');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container mx-auto my-8 p-4">
			<h2 className="text-3xl font-bold mb-4">Internship Application</h2>
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
						Mode of Internship
					</label>
					<select
						value={mode}
						onChange={(e) => setMode(e.target.value)}
						className="w-full p-2 border rounded"
						required>
						<option value="">Select a mode</option>
						<option value="siwes">SIWES</option>
						<option value="bootcamp">Training Bootcamp</option>
						<option value="remote">Remote Internship</option>
					</select>
				</div>
				{error && <p className="text-red-500">{error}</p>}
				<button
					type="submit"
					disabled={loading}
					className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
					{loading ? 'Submitting...' : 'Submit'}
				</button>
			</form>
		</div>
	);
};

export default ApplyInternship;
