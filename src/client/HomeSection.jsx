import {Link} from 'react-router-dom';

const HomeSection = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			<Link>
				<div className="p-4 bg-blue-100 rounded-lg shadow-md">
					<h2 className="text-xl font-bold">Applied Jobs</h2>
					<p>Track all the jobs you've applied for.</p>
				</div>
			</Link>
			<Link to="/internship/">
				<div className="p-4 bg-blue-100 rounded-lg shadow-md">
					<h2 className="text-xl font-bold">Ongoing Internship</h2>
					<p>Monitor the status of your current projects.</p>
				</div>
			</Link>
			<div className="p-4 bg-blue-100 rounded-lg shadow-md">
				<h2 className="text-xl font-bold">Support Tickets</h2>
				<p>View and manage your support inquiries.</p>
			</div>
		</div>
	);
};

export default HomeSection;
