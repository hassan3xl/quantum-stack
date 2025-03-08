import {Link} from 'react-router-dom';

const PendingPage = () => {
	return (
		<div className="container mx-auto my-8 p-4 text-center">
			<h2 className="text-3xl font-bold mb-4">Application Pending</h2>
			<p className="text-gray-600 mb-4">
				Your internship application is still pending. Please wait for
				approval.
			</p>
			<Link to="/" className="text-blue-600 hover:text-blue-800">
				Go back to home
			</Link>
		</div>
	);
};

export default PendingPage;
