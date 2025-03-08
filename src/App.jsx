import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './Auth/Login';
import Register from './Auth/Register';

import {
	BrowserRouter as Router,
	Routes,
	Navigate,
	Route,
} from 'react-router-dom';
import ContactUs from './components/ContactUs';
import InternshipForm from './components/InternshipForm';
import Dashboard from './components/Dashboard';
import ValidateInternshipForm from './components/ValidateInternshipForm';
import InternshipPage from './components/InternshipPage';
import CourseDetailsPage from './components/CourseDetailsPage';
import ApplyInternship from './components/ApplyInternship';
import ThankYouPage from './components/ThankYouPage';
import PendingPage from './components/PendingPage';
import ProjectDevelopment from './components/ProjectDevelopment';
import Profile from './components/ProfilePage';
import ProjectTrackingPage from './components/ProjectTrackingPage';

function App() {
	const PrivateRoute = ({children}) => {
		const isAuthenticated = !!localStorage.getItem('accessToken');
		return isAuthenticated ? children : <Navigate to="/login" />;
	};
	return (
		<Router>
			<Navbar />
			<Routes>
				{/* Protect the routes */}
				<Route path="/" element={<Home />} />
				<Route path="/contact-us" element={<ContactUs />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/register" element={<Register />}></Route>
				<Route
					path="/validate-internship"
					element={
						<PrivateRoute>
							<ValidateInternshipForm />
						</PrivateRoute>
					}
				/>
				<Route
					path="/profile"
					element={
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					}
				/>
				<Route
					path="/internships"
					element={
						<PrivateRoute>
							<InternshipPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/internships/form"
					element={
						<PrivateRoute>
							<InternshipForm />
						</PrivateRoute>
					}
				/>
				<Route
					path="/internships/new"
					element={
						<PrivateRoute>
							<ApplyInternship />
						</PrivateRoute>
					}
				/>
				<Route
					path="/internships/:id"
					element={
						<PrivateRoute>
							<CourseDetailsPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/project-progress/:id"
					element={
						<PrivateRoute>
							<ProjectTrackingPage />
						</PrivateRoute>
					}
				/>

				<Route
					path="/dashboard"
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				/>
				<Route
					path="/internship"
					element={
						<PrivateRoute>
							<InternshipForm />
						</PrivateRoute>
					}
				/>
				<Route
					path="/project-development"
					element={
						<PrivateRoute>
							<ProjectDevelopment />
						</PrivateRoute>
					}
				/>
				<Route
					path="/thank-you"
					element={
						<PrivateRoute>
							<ThankYouPage />
						</PrivateRoute>
					}
				/>

				<Route
					path="/pending"
					element={
						<PrivateRoute>
							<PendingPage />
						</PrivateRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
