import React from 'react';
import {Link} from 'react-router-dom';

const InternshipSection = () => {
	return (
		<div>
			<Link
				to="/internship"
				className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
				Apply for internship with us
			</Link>
			<br />
			<br />
			<h2 className="text-2xl font-bold mb-4">Ongoing Internships</h2>
			<div className="p-4 bg-white rounded-lg shadow-md">
				<Link to="/course-details">
					<h3 className="text-xl font-bold">Software development</h3>
					<p>Duration: 6 Months</p>
					<p>Status: In Progress</p>
					<p>Completion Time: June 15, 2025</p>
				</Link>
			</div>
		</div>
	);
};

export default InternshipSection;
