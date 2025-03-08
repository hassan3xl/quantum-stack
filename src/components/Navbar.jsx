import {Link, useNavigate} from 'react-router-dom';
import {VscAccount} from 'react-icons/vsc';
import {KeyRound, LogOut} from 'lucide-react';
import AccountDropdown from './AccountDropdown';

const Navbar = () => {
	const navigate = useNavigate();
	const isLoggedIn = localStorage.getItem('accessToken'); // Check if the user is logged in
	const username = localStorage.getItem('username'); // Fetch the username from localStorage

	const handleLogout = () => {
		localStorage.removeItem('accessToken'); // Remove the JWT token
		localStorage.removeItem('username'); // Remove the username
		navigate('/login'); // Redirect to the login page
	};

	return (
		<nav className="bg-blue-900 text-white p-4 shadow-lg">
			<div className="container mx-auto flex justify-between items-center">
				<Link to="/" className="text-2xl font-bold">
					Quantum Stack
				</Link>
				<ul className="flex gap-6 items-center">
					{isLoggedIn ? (
						<>
							<li>
								<Link className="hover:text-blue-300 flex items-center gap-2">
									<span className="font-medium">
										<AccountDropdown />
									</span>
								</Link>
							</li>
						</>
					) : (
						<>
							<li>
								<Link
									to="/login"
									className="hover:text-blue-300 h-40 w-40"></Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
