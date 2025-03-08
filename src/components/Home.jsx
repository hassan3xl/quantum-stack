// src/pages/Home.jsx
import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {Navigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

const services = [
	{
		title: 'Web Development',
		details: [
			'Frontend Development',
			'Backend Development',

			'Full-Stack Development',
		],
	},
	{
		title: 'Mobile App Development',
		details: ['Android Apps', 'iOS Apps', 'Cross-Platform Development'],
	},
	{
		title: 'DevOps',
		details: [
			'CI/CD Pipelines',
			'Infrastructure Automation',
			'Cloud Management',
		],
	},
	{
		title: 'Desktop Application Development',
		details: ['Windows Apps', 'Mac Apps', 'Custom Software'],
	},
	{
		title: 'Internships',
		details: ['SIWES', 'Training Bootcamp', 'Remote Internship'],
	},
];

const Home = () => {
	const [expandedIndex, setExpandedIndex] = useState(null);

	const toggleService = (index) => {
		setExpandedIndex(expandedIndex === index ? null : index);
	};

	return (
		<div className="h-screen">
			{/* Hero Section */}
			<section
				id="home"
				className="bg-gradient-to-r from-blue-800 to-blue-400 text-white text-center py-10">
				<h1 className="text-4xl font-bold mb-4">
					Welcome to Quantum Stack
				</h1>
				<p className="text-lg mb-6">
					Empowering businesses with cutting-edge software solutions.
				</p>
				<Link
					className="bg-white text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-blue-300"
					to="/dashboard">
					Get Started
				</Link>
			</section>

			{/* Services Section */}
			<section id="services" className="container mx-auto py-16 px-4">
				<h2 className="text-3xl font-bold text-center mb-8">
					Our Services
				</h2>
				<div className="space-y-6">
					{services.map((service, index) => (
						<div
							key={index}
							className="border rounded-lg p-4 bg-white shadow-md">
							<div
								className="flex justify-between items-center cursor-pointer"
								onClick={() => toggleService(index)}>
								<h3 className="text-xl font-bold">
									{service.title}
								</h3>
								<span>
									{expandedIndex === index ? '▲' : '▼'}
								</span>
							</div>
							{expandedIndex === index && (
								<ul className="mt-4 space-y-2">
									{service.details.map((detail, i) => (
										<li key={i} className="text-gray-700">
											- {detail}
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</div>
			</section>

			{/* Footer */}
		</div>
	);
};

export default Home;
