import {useEffect, useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {API} from '../services/api';
import Loader from './Loader'

const ProfilePage = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const fetchProfileData = async () => {
			try {
				const response = await API.get('profile/', {});
				setUser(response.data);
			} catch (err) {
				setError('Failed to fetch profile data.');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProfileData();
	}, []);

	if (loading) return <Loader />
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="container mx-auto my-8 p-4">
			<h2 className="text-3xl font-bold mb-4">Profile</h2>

			{/* User Information */}
			<div className="bg-white p-6 rounded-lg shadow-md mb-6">
				<h3 className="text-2xl font-semibold mb-4">
					User Information
				</h3>
				<p>
					<strong>First Name:</strong> {user.first_name}
				</p><p>
					<strong>Last Name:</strong> {user.last_name}
				</p>
				<p>
					<strong>Email:</strong> {user.email}
				</p>
				<Link
					to="/edit-profile"
					className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
					Edit Profile
				</Link>
			</div>

			{/* Internship Applications */}
			{user.internships && user.internships.length > 0 && (
				<div className="bg-white p-6 rounded-lg shadow-md mb-6">
					<h3 className="text-2xl font-semibold mb-4">
						Internship Applications
					</h3>
					<ul className="space-y-4">
						{user.internships.map((internship) => (
							<li
								key={internship.id}
								className="border p-4 rounded-lg">
								<p>
									<strong>Course:</strong>{' '}
									{internship.course.title}
								</p>
								<p>
									<strong>Status:</strong> {internship.status}
								</p>
								<Link
									to={`/internships/${internship.id}`}
									className="mt-2 inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
									View Progress
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}

			{/* Project Requests */}
			{user.projects && user.projects.length > 0 && (
				<div className="bg-white p-6 rounded-lg shadow-md mb-6">
					<h3 className="text-2xl font-semibold mb-4">
						Project Requests
					</h3>
					<ul className="space-y-4">
						{user.projects.map((project) => (
							<li
								key={project.id}
								className="border p-4 rounded-lg">
								<p>
									<strong>Title:</strong> {project.title}
								</p>
								<p>
									<strong>Status:</strong> {project.status}
								</p>
								<p>
									<strong>Payment Status:</strong>{' '}
									{project.payment_status}
								</p>
								<p>
									<strong>Expected Completion:</strong>{' '}
									{project.expected_completion_date}
								</p>
								<Link
									to={`/project-progress/${project.id}`}
									className="mt-2 inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
									View Progress
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
