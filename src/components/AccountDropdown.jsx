import { useState, useEffect, useRef } from 'react';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

export default function AccountDropdown() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref to track the dropdown element
  const isLoggedIn = localStorage.getItem('accessToken'); // Check if the user is logged in

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    setIsOpen(false);
    navigate('/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center focus:outline-none hover:border-gray-400 transition-colors"
      >
        <img
          src="https://i.pravatar.cc/100"
          alt="User"
          className="w-full h-full rounded-full object-cover"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-10 transform transition-all duration-200 ease-in-out scale-95 origin-top-right">
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors duration-150"
            onClick={() => setIsOpen(false)}
          >
            <FiUser className="w-4 h-4 text-gray-500" />
            <span>Profile</span>
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors duration-150"
            onClick={() => setIsOpen(false)}
          >
            <FiSettings className="w-4 h-4 text-gray-500" />
            <span>Settings</span>
          </Link>
          <button
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2 transition-colors duration-150"
            onClick={handleLogout}
          >
            <FiLogOut className="w-4 h-4 text-red-500" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}