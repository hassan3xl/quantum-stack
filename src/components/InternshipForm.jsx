import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const InternshipApplicationForm = () => {
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		date_of_birth: '',
		course: '',
		language: '',
		framework: '',
		duration: '',
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData({...formData, [name]: value});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const response = await axios.post(
				'http://127.0.0.1:8000/api/internship/',
				formData,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'accessToken',
						)}`,
					},
				},
			);
			console.log('Application submitted:', response.data);
			navigate('/'); // Redirect to home or confirmation page
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
						First Name
					</label>
					<input
						type="text"
						name="first_name"
						value={formData.first_name}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Last Name
					</label>
					<input
						type="text"
						name="last_name"
						value={formData.last_name}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Email
					</label>
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Date of Birth
					</label>
					<input
						type="date"
						name="date_of_birth"
						value={formData.date_of_birth}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Course
					</label>
					<select
						name="course"
						value={formData.course}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required>
						<option value="">Select a course</option>
						<option value="software_dev">
							Software Development
						</option>
						<option value="data_science">Data Science</option>
						<option value="web_dev">Web Development</option>
						<option value="mobile_dev">Mobile Development</option>
					</select>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Language
					</label>
					<select
						name="language"
						value={formData.language}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required>
						<option value="">Select a language</option>
						<option value="python">Python</option>
						<option value="javascript">JavaScript</option>
						<option value="java">Java</option>
						<option value="ruby">Ruby</option>
						<option value="csharp">C#</option>
					</select>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Framework
					</label>
					<select
						name="framework"
						value={formData.framework}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required>
						<option value="">Select a framework</option>
						<option value="django">Django</option>
						<option value="react">React</option>
						<option value="flask">Flask</option>
						<option value="vue">Vue.js</option>
						<option value="angular">Angular</option>
					</select>
				</div>
				<div>
					<label className="block text-sm font-medium mb-1">
						Duration
					</label>
					<select
						name="duration"
						value={formData.duration}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required>
						<option value="">Select duration</option>
						<option value="3 Months">3 Months</option>
						<option value="6 Months">6 Months</option>
						<option value="9 Months">9 Months</option>
						<option value="12 Months">12 Months</option>
					</select>
				</div>
				{error && <p className="text-red-500">{error}</p>}
				<button
					type="submit"
					disabled={loading}
					className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
					{loading ? 'Submitting...' : 'Submit Application'}
				</button>
			</form>
		</div>
	);
};

export default InternshipApplicationForm;
