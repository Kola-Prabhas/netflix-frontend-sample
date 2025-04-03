import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { baseUrl } from '../envVars';

export const useAuthStore = create((set) => ({
	user: null,
	isSigningUp: false,
	icCheckingAuth: false,
	isLoggingIn: false,
	signup: async (credentials) => {
		set({ isSigningUp: true });
		try {
			const response = await axios.post(`${baseUrl}/api/v1/auth/signup`, credentials, { withCredentials: true });
			set({ user: response.data.user, isSigningUp: false });
			toast.success('Account created successfully.');
		} catch (error) {
			toast.error(error?.response?.data?.message || 'Signup failed');
			set({ isSigningUp: false, user: null });
		}
	},
	login: async (credentials) => {
		set({ isLoggingIn: true });
		try {
			const response = await axios.post(`${baseUrl}/api/v1/auth/login`, credentials, { withCredentials: true });
			console.log('login response', response);
			set({ user: response.data.user, isLoggingIn: false });
		} catch (error) {
			set({ isLoggingIn: false, user: null });
			toast.error(error?.response?.data?.message || 'Login failed');
		}
	},
	logout: async () => {
		set({ isLoggingOut: true });
		try {
			await axios.post(`${baseUrl}/api/v1/auth/logout`);
			set({ user: null, isLoggingOut: false });
			toast.success('Logged out successfully');
		} catch (error) {
			set({ isLoggingOut: false });
			toast.error(error?.response?.data?.message || 'Logout failed');
		}
	},
	authCheck: async () => {
		set({ isCheckingAuth: true });
		try {
			const response = await axios.get(`${baseUrl}/api/v1/auth/authCheck`, {
				withCredentials: true,
			});

			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
			set({ isCheckingAuth: false, user: null });
			console.log('Auth check error ', error);
			// toast.error(error?.response?.data?.message || "An error occurred");
		}
	},
	getUser: async (id) => {
		try {
			const response = await axios.get(`${baseUrl}/api/v1/auth/users/${id}`, {
				withCredentials: true,
			});
			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
			set({ isCheckingAuth: false, user: null });
			toast.error(error?.response?.data?.message || "An error occurred");
		}
	}
}));