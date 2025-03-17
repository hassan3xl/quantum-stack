// Login.js
import React, { useState } from 'react';
import { login, register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (isRegister) {
        const response = await register(formData);
        console.log('Registration successful:', response.data);
        setIsRegister(false);
      } else {
        const response = await login(formData);
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        localStorage.setItem('email', formData.email);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(
        isRegister
          ? 'Registration failed. Please try again.'
          : 'Invalid email or password'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-100">
      {isLoading && <Loader />}
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">
          {isRegister ? 'Register' : 'Login'}
        </h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
          className="w-full p-2 border rounded mb-4"
          required
          disabled={isLoading}
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
          required
          disabled={isLoading}
        />

        <button 
          className={`bg-blue-500 text-white px-4 py-2 rounded w-full mb-4 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isRegister ? 'Register' : 'Login'}
        </button>

        <p className="text-center text-sm text-gray-600">
          {isRegister
            ? 'Already have an account? '
            : 'Don’t have an account? '}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-500 hover:text-blue-700"
            disabled={isLoading}
          >
            {isRegister ? 'Login here' : 'Register here'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;