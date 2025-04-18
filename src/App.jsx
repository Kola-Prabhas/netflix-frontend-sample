import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import { useAuthStore } from './store/authUser';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import SearchPage from './pages/SearchPage';
import WatchPage from './pages/WatchPage';
import SearchHistoryPage from './pages/SearchHistoryPage';
import NotFoundPage from './pages/404';
import Footer from './components/Footer';
import ProfilePage from './pages/ProfilePage';
import StripeCheckoutPage from './pages/StripeCheckout';
import PaymentSuccessPage from './pages/paymentSuccessPage';
import ChatPage from './pages/ChatPage';

function App() {
	const { user, isCheckingAuth, authCheck } = useAuthStore();

	useEffect(() => {
		authCheck();
	}, [authCheck]);

	if (isCheckingAuth) {
		return (
			<div className="h-screen">
				<div className="flex justify-center items-center bg-black h-full">
					<Loader className="animate-spin text-red-600 size-10" />
				</div>
			</div>
		);
	}

	return (
		<>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/login"
					element={!user ? <LoginPage /> : <Navigate to="/" />}
				/>
				<Route
					path="/signup"
					element={!user ? <SignUpPage /> : <Navigate to="/" />}
				/>
				<Route
					path="/search"
					element={user ? <SearchPage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/watch/:id"
					element={user ? <WatchPage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/history"
					element={user ? <SearchHistoryPage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/profile"
					element={user ? <ProfilePage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/stripe-checkout"
					element={user ? <StripeCheckoutPage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/payment-success/:id"
					element={user ? <PaymentSuccessPage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/chat"
					element={<ChatPage />}
				/>
				<Route path="/*" element={<NotFoundPage />} />
			</Routes>
			<Footer />
			<Toaster />
		</>
	);
}

export default App;