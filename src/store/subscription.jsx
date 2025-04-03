import { create } from 'zustand';
import axios from 'axios';
import { baseUrl } from '../envVars';
import toast from 'react-hot-toast';

export const useSubscriptionStore = create((set) => ({
	contentType: 'subscription',
	currentSubscription: null,
	isCurrentlyPaying: false,

	createSubscription: async (subscription) => {
		try {
			const response = await axios.post(`${baseUrl}/api/v1/subscription`, subscription, { withCredentials: true });

			set({ currentSubscription: response.data.data.user.subscription, isCurrentlyPaying: true });
		} catch (error) {
			console.log('subscripiton error ', error);

			toast.error(error?.response?.data?.message || 'Failed to create Subscription');
			set({ isCurrentlyPaying: false, currentSubscription: null });
		}
	},

	markSubscriptionAsPaid: async (userId) => {
		try {
			await axios.patch(`${baseUrl}/api/v1/subscription/${userId}`, {}, { withCredentials: true });
			set({ currentSubscription: null, isCurrentlyPaying: false });
			toast.success('Subscription paid successfully');
		} catch (error) {
			toast.error(error?.response?.data?.message || 'Failed to pay for the subscription');
			set({ isCurrentlyPaying: false, currentSubscription: null });
		}
	}
}));