export function isActive(subscription) {
	const expirtyDate = new Date(Date.parse(subscription.expiresOn));

	return subscription && subscription.paymentStatus === 'paid' && expirtyDate > new Date();
}