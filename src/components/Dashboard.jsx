import Footer from '../components/Footer';
import {Link} from 'react-router-dom';

const services = [
	{
		title: 'Web Development',
		details: [
			'Frontend Development',
			'Backend Development',
			'Full-Stack Development',
		],
		link: '/project-development',
	},
	{
		title: 'Mobile App Development',
		details: ['Android Apps', 'iOS Apps', 'Cross-Platform Development'],
		link: '/project-development',
	},
	{
		title: 'DevOps',
		details: [
			'CI/CD Pipelines',
			'Infrastructure Automation',
			'Cloud Management',
		],
		link: '/project-development',
	},
	{
		title: 'Desktop Application Development',
		details: ['Windows Apps', 'Mac Apps', 'Custom Software'],
		link: '/project-development',
	},
	{
		title: 'Internships',
		details: ['SIWES', 'Training Bootcamp', 'Remote Internship'],
		link: '/internships',
	},
	{
		title: 'Contact Us',
		details: ['Email', 'Phone', 'Instagram'],
		link: '/contact-us',
	},
];

const Dashboard = () => {
	return (
		<div className="min-h-screen bg-gray-100">
			{/* Dashboard Header */}
			<section className="bg-gradient-to-r from-blue-800 to-blue-400 text-white text-center py-10">
				<h1 className="text-4xl font-bold mb-4">Dashboard</h1>
				<p className="text-lg mb-6">
					Explore our services and find the right solution for your
					needs.
				</p>
			</section>

			{/* Services Cards Section */}
			<section className="container mx-auto py-16 px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{services.map((service, index) => (
						<Link
							key={index}
							to={service.link}
							className="border rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
							<h3 className="text-xl font-bold mb-4">
								{service.title}
							</h3>
							<ul className="space-y-2">
								{service.details.map((detail, i) => (
									<li key={i} className="text-gray-700">
										- {detail}
									</li>
								))}
							</ul>
						</Link>
					))}
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default Dashboard;
