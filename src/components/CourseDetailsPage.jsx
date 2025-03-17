import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getCourseDetails} from '../services/api';
import Loader from './Loader'

const CourseDetailsPage = () => {
	const {id} = useParams();
	const [course, setCourse] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCourseDetails = async () => {
			try {
				const response = await getCourseDetails(id);
				if (response.data.status === 'Pending') {
					navigate('/pending'); // Redirect to a "Pending" page
				}
				setCourse(response.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCourseDetails();
	}, [id]);

	// Calculate progress based on time remaining
	const calculateProgress = () => {
		if (!course) return 0;

		const startDate = new Date(course.starting_date);
		const endDate = new Date(course.completion_date);
		const today = new Date();

		const totalDuration = endDate - startDate;
		const elapsedDuration = today - startDate;

		if (elapsedDuration <= 0) return 0;
		if (elapsedDuration >= totalDuration) return 100;

		return Math.round((elapsedDuration / totalDuration) * 100);
	};

	if (loading) return < Loader />
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="container mx-auto my-8 p-4">
			{/* Progress Tracking */}
			<div className="mb-6">
				<h3 className="text-2xl font-semibold mb-2">
					Progress Tracking
				</h3>
				<div className="border p-4">
					<p>Progress: {calculateProgress()}% Complete</p>
					<div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
						<div
							className="bg-blue-600 h-4 rounded-full"
							style={{width: `${calculateProgress()}%`}}></div>
					</div>
				</div>
			</div>

			{/* Learning Materials */}
			<div className="mb-6">
				<h3 className="text-2xl font-semibold mb-2">
					Learning Materials
				</h3>
				<ul className="space-y-4">
					{course.course.materials.map((material) => (
						<li key={material.id} className="border p-4 rounded-lg">
							<h3 className="text-xl font-semibold">
								{material.title}
							</h3>
							<p className="text-gray-600">
								Type: {material.material_type}
							</p>
							{material.material_type === 'video' && (
								<video controls className="w-full mt-2">
									<source
										src={material.file}
										type="video/mp4"
									/>
									Your browser does not support the video tag.
								</video>
							)}
							{material.material_type === 'pdf' && (
								<a
									href={material.file}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:text-blue-800">
									Download PDF
								</a>
							)}
							{material.material_type === 'image' && (
								<img
									src={material.file}
									alt={material.title}
									className="w-full mt-2 rounded-lg cursor-pointer"
									onClick={() =>
										window.open(material.file, '_blank')
									}
								/>
							)}
						</li>
					))}
				</ul>
			</div>

			{/* Collaboration Tools */}
			<div className="mb-6">
				<h3 className="text-2xl font-semibold mb-2">
					Collaboration Tools
				</h3>
				<div className="border p-4 rounded-lg">
					<ul className="list-disc list-inside">
						<li>
							<a
								href="https://slack.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:text-blue-800">
								Slack Channel
							</a>
						</li>
						<li>
							<a
								href="https://slack.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:text-blue-800">
								Google Classroom
							</a>
						</li>
						<li>
							<a
								href="https://trello.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:text-blue-800">
								Trello Board
							</a>
						</li>
						<li>
							<a
								href="https://github.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:text-blue-800">
								GitHub Repository
							</a>
						</li>
					</ul>
				</div>
			</div>

			{/* Timetable */}
			<div className="mb-6">
				<h3 className="text-2xl font-semibold mb-2">Timetable</h3>
				<div className="border p-4 rounded-lg">
					<table className="w-full text-left border-collapse">
						<thead>
							<tr>
								<th className="border-b p-2">Day</th>
								<th className="border-b p-2">Time</th>
								<th className="border-b p-2">Activity</th>
							</tr>
						</thead>
						<tbody>
							{course.course.timetables.map((entry) => (
								<tr key={entry.id}>
									<td className="border-b p-2">
										{new Date(
											entry.start_time,
										).toLocaleDateString('en-US', {
											weekday: 'long',
										})}
									</td>
									<td className="border-b p-2">
										{new Date(
											entry.start_time,
										).toLocaleTimeString('en-US', {
											hour: '2-digit',
											minute: '2-digit',
										})}{' '}
										-{' '}
										{new Date(
											entry.end_time,
										).toLocaleTimeString('en-US', {
											hour: '2-digit',
											minute: '2-digit',
										})}
									</td>
									<td className="border-b p-2">
										{entry.title}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default CourseDetailsPage;
