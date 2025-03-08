import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {API} from '../services/api';

const ProjectTrackingPage = () => {
	const {id} = useParams();
	const [project, setProject] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const response = await API.get(`/projects/${id}/`);
				setProject(response.data);
			} catch (err) {
				setError('Failed to fetch project details.');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProject();
	}, [id]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="container mx-auto my-8 p-4">
			<h2 className="text-3xl font-bold mb-4">Project Tracking</h2>
			<div className="border p-4 rounded-lg">
				<h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
				<p className="text-gray-600 mb-2">{project.description}</p>
				<p>
					<strong>Status:</strong> {project.status}
				</p>
				<p>
					<strong>Expected Completion Date:</strong>{' '}
					{project.expected_completion_date}
				</p>
				<p>
					<strong>Payment Status:</strong> {project.payment_status}
				</p>
			</div>
		</div>
	);
};

export default ProjectTrackingPage;
