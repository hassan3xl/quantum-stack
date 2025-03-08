// src/components/WorkTrackingSection.jsx
import React from 'react';

const WorkTrackingSection = () => {
	return (
		<div>
			<h2 className="text-2xl font-bold mb-4">Ongoing Projects</h2>
			<div className="space-y-4">
				{/* Example project cards */}
				<div className="p-4 bg-white rounded-lg shadow-md">
					<h3 className="text-xl font-bold">E-commerce Platform</h3>
					<p>Status: In Progress</p>
					<p>Next Deadline: Jan 15, 2025</p>
				</div>
				<div className="p-4 bg-white rounded-lg shadow-md">
					<h3 className="text-xl font-bold">Mobile App</h3>
					<p>Status: Review Phase</p>
					<p>Next Deadline: Jan 20, 2025</p>
				</div>
			</div>
		</div>
	);
};

export default WorkTrackingSection;
