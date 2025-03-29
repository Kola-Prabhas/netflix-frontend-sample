import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";
import "../Stripe.css";
import Navbar from "../components/Navbar";


const baseUrl = import.meta.env.VITE_BACKEND_URL;

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51PfYgfCP52ANZ4velwZeiqbZBWg6pNcmaiXtR8lkmUgVkOgPMGCxAYyFtUuQFPiBnBokZDjBs9uSoSbXw1KPwz7K00lFfm5M6b");

export default function StripeCheckout() {
	const [clientSecret, setClientSecret] = useState("");
	const [clientSecretLoading, setClientSecretLoading] = useState(true);

	const location = useLocation();
	const totalAmount = location.state.totalPrice;
	const subscriptionId = location.state.subscriptionId;

	useEffect(() => {
		setClientSecretLoading(true);
		// Create PaymentIntent as soon as the page loads
		fetch(baseUrl + "/api/v1/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ totalAmount: totalAmount }),
			meta: {
				order_id: subscriptionId, // this is the order id we are creating in the backend
				// this info will go to stripe and then to our server via webhook
				// useful for determining which order is successful even if client closes the browser
			}
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret))
			.finally(() => setClientSecretLoading(false));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const appearance = {
		theme: 'night',
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<>
			<div className='bg-gray-900 text-gray-200'>
				<Navbar />
			</div>
			<div className="Stripe my-10 flex items-center justify-center">
				{clientSecretLoading && (
					<div className='min-h-[80vh] flex items-center justify-center'>
						...Loading
					</div>
				)}
				{clientSecret && !clientSecretLoading && (
					<Elements options={options} stripe={stripePromise}>
						<CheckoutForm
							subscriptionId={subscriptionId}
							totalAmount={totalAmount}
						/>
					</Elements>
				)}
			</div>
		</>
	);
}