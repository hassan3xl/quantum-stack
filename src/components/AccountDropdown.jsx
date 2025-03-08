import {useState} from 'react';
import {FiUser, FiSettings, FiLogOut} from 'react-icons/fi';
import {Link, useNavigate} from 'react-router-dom';

export default function AccountDropdown() {
	const navigate = useNavigate();
	const isLoggedIn = localStorage.getItem('accessToken'); // Check if the user is logged in

	const handleLogout = () => {
		localStorage.removeItem('accessToken'); // Remove the JWT token
		localStorage.removeItem('username'); // Remove the username
		setIsOpen(false);
		navigate('/login'); // Redirect to the login page
	};
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative">
			{/* Profile Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center  ">
				<img
					src="https://i.pravatar.cc/100"
					alt="User"
					className="w-full h-full rounded-full object-cover"
				/>
			</button>

			{/* Dropdown Menu */}
			{isOpen && (
				<div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md ">
					<Link
						to="/profile"
						className="w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-100"
						onClick={() => setIsOpen(false)}>
						<FiUser className="w-4 h-4" /> Profile
					</Link>
					<Link
						className="w-full px-4 py-2 flex items-center gap-2 hover:bg-gray-100"
						onClick={() => setIsOpen(false)}>
						<FiSettings className="w-4 h-4" /> Settings
					</Link>
					<button
						className="w-full px-4 py-2 flex items-center gap-2 text-red-500 hover:bg-gray-100"
						onClick={handleLogout}>
						<FiLogOut className="w-4 h-4" /> Logout
					</button>
				</div>
			)}
		</div>
	);
}
