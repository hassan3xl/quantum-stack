import axios from 'axios';

export const API = axios.create({
	baseURL: 'https://quantum-stack-backend.onrender.com/api/',
});

// Add JWT token to headers if available
API.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		} else {
			console.warn('No token found in localStorage');
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Function to refresh token
const refreshToken = async () => {
	try {
		const refresh = localStorage.getItem('refreshToken');
		if (!refresh) {
			throw new Error('No refresh token available');
		}
		const response = await axios.post(
			'https://quantum-stack-backend.onrender.com/api/token/refresh/',
			{refresh},
		);
		localStorage.setItem('accessToken', response.data.access); // Store new access token
		return response.data.access;
	} catch (error) {
		console.error('Refresh token failed, logging out...');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		window.location.href = '/login';
		return null;
	}
};

// Response interceptor to handle 401 errors
API.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true; // Prevent infinite loops
			const newAccessToken = await refreshToken();
			if (newAccessToken) {
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
				return API(originalRequest); // Retry the failed request with new token
			}
		}
		return Promise.reject(error);
	},
);

// API Endpoints
export const register = (data) => API.post('register/', data);
export const login = (credentials) => API.post('token/', credentials);
export const userInternshipData = () => API.get('internships/');
export const getCourseDetails = (id) => API.get(`internships/${id}/`);
