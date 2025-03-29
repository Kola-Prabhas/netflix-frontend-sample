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

			console.log('response ', response);

			set({ currentSubscription: response.data.subscription, isCurrentlyPaying: true });
		} catch (error) {
			toast.error(error?.response?.data?.message || 'Failed to create Subscription');
			set({ isCurrentlyPaying: false, currentSubscription: null });
		}
	},

	markSubscriptionAsPaid: async (subscriptionId) => {
		try {
			await axios.patch(`${baseUrl}/api/v1/subscription/${subscriptionId}`, { withCredentials: true });
			set({ currentSubscription: false, isCurrentlyPaying: false });
			toast.success('Subscription paid successfully');
		} catch (error) {
			toast.error(error?.response?.data?.message || 'Failed to pay for the subscription');
			set({ isCurrentlyPaying: false, currentSubscription: null });
		}
	}
}));