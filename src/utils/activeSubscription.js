export function isActive(subscription) {
	if (!subscription) {
		return false;
	}

	const expirtyDate = new Date(Date.parse(subscription.expiresOn));

	return subscription.paymentStatus === 'paid' && expirtyDate > new Date();
}