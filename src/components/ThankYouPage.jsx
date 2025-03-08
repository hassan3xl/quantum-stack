import React from 'react';
import {Link} from 'react-router-dom';

const ThankYouPage = () => {
	return (
		<div className="container mx-auto my-8 p-4 text-center">
			<h2 className="text-3xl font-bold mb-4">Thank You!</h2>
			<p className="text-gray-600 mb-4">
				We have received your application. Please check your email for
				further instructions.
			</p>
			<Link to="/" className="text-blue-600 hover:text-blue-800">
				Go back to home
			</Link>
		</div>
	);
};

export default ThankYouPage;
