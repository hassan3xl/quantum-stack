// src/pages/ClientDashboard.jsx
import React, {useState, useEffect} from 'react';
import HomeSection from './HomeSection';
import WorkTrackingSection from './WorkTrackingSection';
import InternshipSection from './InternshipSection';
import SupportSection from './SupportSection';
import {userInternshipData} from '../services/api';

const ClientDashboard = () => {
	const [activeSection, setActiveSection] = useState('home');
	const [internships, setInternships] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await userInternshipData();
				setInternships(response.data); // Assuming the API returns an array of internships
			} catch (err) {
				console.error('Error fetching internships:', err);
				setError('Failed to fetch internship data.');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;
	console.log(internships);

	const renderSection = () => {
		switch (activeSection) {
			case 'home':
				return <HomeSection />;
			case 'internship':
				return <InternshipSection />;
			case 'work':
				return <WorkTrackingSection />;
			case 'support':
				return <SupportSection />;
			default:
				return <HomeSection />;
		}
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">My Internships</h1>
			{internships.length === 0 ? (
				<p>No internships found.</p>
			) : (
				<div className="grid gap-4">
					{internships.map((internship) => (
						<div
							key={internship.id}
							className="p-4 border rounded shadow-md bg-white">
							<h2 className="text-xl font-semibold">
								{internship.first_name} {internship.last_name}
							</h2>
							<p>Email: {internship.email}</p>
							<p>
								Date of Birth:{' '}
								{new Date(
									internship.date_of_birth,
								).toLocaleDateString()}
							</p>
							<p>
								Starting Date:{' '}
								{new Date(
									internship.starting_date,
								).toLocaleDateString()}
							</p>
							<p>
								Completion Date:{' '}
								{new Date(
									internship.completion_date,
								).toLocaleDateString()}
							</p>
							<p>Course: {internship.course}</p>
							<p>Language: {internship.language}</p>
							<p>Framework: {internship.framework}</p>
							<p>
								Created At:{' '}
								{new Date(
									internship.created_at,
								).toLocaleDateString()}
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ClientDashboard;
