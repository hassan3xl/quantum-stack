import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const CourseTimetable = () => {
	const {courseId} = useParams();
	const [timetable, setTimetable] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTimetable = async () => {
			try {
				const response = await axios.get(
					`http://127.0.0.1:8000/api/courses/${courseId}/timetable/`,
				);
				setTimetable(response.data);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchTimetable();
	}, [courseId]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<h2>Timetable for Course</h2>
			<ul>
				{timetable.map((entry) => (
					<li key={entry.id}>
						<h3>{entry.title}</h3>
						<p>{entry.description}</p>
						<p>
							<strong>Time:</strong>{' '}
							{new Date(entry.start_time).toLocaleString()} -{' '}
							{new Date(entry.end_time).toLocaleString()}
						</p>
						{entry.is_live_session && (
							<p>
								<strong>Live Session</strong>
							</p>
						)}
						{entry.location && (
							<p>
								<strong>Location:</strong> {entry.location}
							</p>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default CourseTimetable;
