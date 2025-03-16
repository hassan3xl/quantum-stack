import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {API} from '../services/api';
import Loader from './Loader'

const InternshipPage = () => {
	const [internships, setInternships] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [showNotificationModal, setShowNotificationModal] = useState(false);
	const [showUpcomingClassModal, setShowUpcomingClassModal] = useState(false);
	const [upcomingClass, setUpcomingClass] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchInternships = async () => {
			try {
				const response = await API.get('internships/');
				setInternships(response.data);
				setLoading(false);
			} catch (err) {
				console.error('Error fetching internships:', err);
				setError(
					'Unable to fetch internships. Please try again later.',
				);
				setLoading(false);
			}
		};

		fetchInternships();
	}, []);

	// Simulate fetching upcoming class data
	useEffect(() => {
		const fetchUpcomingClass = async () => {
			try {
				const response = await API.get('upcoming-class/');
				setUpcomingClass(response.data);
			} catch (err) {
				console.error('Error fetching upcoming class:', err);
			}
		};

		fetchUpcomingClass();
	}, []);

	const handleNotificationClick = () => {
		setShowNotificationModal(true);
	};

	const handleUpcomingClassClick = () => {
		setShowUpcomingClassModal(true);
	};

	const applyNewInternship = () => {
		navigate('/internships/new');
	};

	if (loading) return <Loader />;
	if (error) return <p className="text-red-600">{error}</p>;

	return (
		<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
			<h1 className="text-3xl font-bold mb-4">Ongoing Internships</h1>

			{/* Action Buttons */}
			<div className="flex gap-4 mb-6">
				<button
					onClick={handleNotificationClick}
					className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
					View Notifications
				</button>
				<button
					onClick={handleUpcomingClassClick}
					className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
					Upcoming Class
				</button>

				<button
					onClick={applyNewInternship}
					className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
					Start a New Internship
				</button>
			</div>

			{/* Internships List */}
			{internships.length === 0 ? (
				<p>
					No internships found. You are not enrolled in any
					internships.
				</p>
			) : (
				<div className="grid gap-4">
					{internships.map((internship) => (
						<Link
							to={`/internships/${internship.id}`}
							key={internship.id}>
							<div className="p-4 border rounded-lg shadow hover:bg-gray-100">
								<h2 className="text-xl font-semibold">
									{internship.course.title}
								</h2>
								<p>Starting Date: {internship.starting_date}</p>
								<p>
									Completion Date:{' '}
									{internship.completion_date}
								</p>
								<p>Duration: {internship.duration}</p>
								<p>Status: {internship.status}</p>
							</div>
						</Link>
					))}
				</div>
			)}

			{/* Notification Modal */}
			{showNotificationModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
						<h2 className="text-xl font-bold mb-4">
							Notifications
						</h2>
						<p>No new notifications.</p>
						<button
							onClick={() => setShowNotificationModal(false)}
							className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
							Close
						</button>
					</div>
				</div>
			)}

			{/* Upcoming Class Modal */}
			{showUpcomingClassModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
						<h2 className="text-xl font-bold mb-4">
							Upcoming Class
						</h2>
						{upcomingClass ? (
							<div>
								<p>
									<strong>Title:</strong>{' '}
									{upcomingClass.title}
								</p>
								<p>
									<strong>Date:</strong> {upcomingClass.date}
								</p>
								<p>
									<strong>Time:</strong> {upcomingClass.time}
								</p>
								<p>
									<strong>Instructor:</strong>{' '}
									{upcomingClass.instructor}
								</p>
							</div>
						) : (
							<p>No upcoming classes scheduled.</p>
						)}
						<button
							onClick={() => setShowUpcomingClassModal(false)}
							className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
							Close
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default InternshipPage;
