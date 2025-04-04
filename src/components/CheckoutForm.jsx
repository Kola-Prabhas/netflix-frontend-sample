import { useEffect, useState } from "react";
import {
	PaymentElement,
	useStripe,
	useElements
} from "@stripe/react-stripe-js";
import { useSubscriptionStore } from "../store/subscription";
import { useAuthStore } from '../store/authUser';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';


export default function CheckoutForm({ userId, totalAmount }) {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();

	const baseUrl = window.location.origin;

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const markSubscriptionAsPaid = useSubscriptionStore((state) => state.markSubscriptionAsPaid);
	const getUser = useAuthStore(state => state.getUser);



	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded!");
					break;
				case "processing":
					setMessage("Your payment is processing.");
					break;
				case "requires_payment_method":
					setMessage("Your payment was not successful, please try again.");
					break;
				default:
					setMessage("Something went wrong.");
					break;
			}
		});
	}, [stripe]);




	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js hasn't yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		markSubscriptionAsPaid(userId);
		// getUser(userId);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// Make sure to change this to your payment completion page
				// return_url: baseUrl + `/${orderId}`,
				return_url: `${baseUrl}/login`,
			},
			// redirect: "if_required"
		});

		// if (error) {
		// 	toast.error("Payment failed:", error.message);
		// } else {
		// 	setTimeout(() => {
		// 		markSubscriptionAsPaid(userId);
		// 		getUser(userId);
		// 		navigate(`/payment-success/${userId}`);
		// 	}, 1000);
		// }

		// dispatch(updateOrderAsync({ id: orderId, paymentStatus: "unpaid" }));

		// This point will only be reached if there is an immediate error when
		// confirming the payment. Otherwise, your customer will be redirected to
		// your `return_url`. For some payment methods like iDEAL, your customer will
		// be redirected to an intermediate site first to authorize the payment, then
		// redirected to the `return_url`.

		if (error?.type === "card_error" || error?.type === "validation_error") {
			setMessage(error.message);
		} else {
			console.log('error ', error);
			setMessage("An unexpected error occurred.");
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: "tabs"
	}

	return (
		<>
			<form id="payment-form" onSubmit={handleSubmit}>
				<h1 className='flex items-center justify-center gap-1 font-semibold mb-4 -mt-4'>
					<p className="text-gray-200">Total Amount: </p>
					<span className='text-gray-400 sm:text-lg'>${totalAmount}</span>
				</h1>
				<PaymentElement id="payment-element" options={paymentElementOptions} />
				<button disabled={isLoading || !stripe || !elements} id="submit">
					<span id="button-text">
						{isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
					</span>
				</button>
				{/* Show any error or success messages */}
				{message && <div id="payment-message">{message}</div>}
			</form>
		</>
	);
}