import Profile from "../components/Profile";
import Subscriptions from "../components/Subscriptions";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
	return (
		<div className='bg-gray-900'>
			<div className='text-gray-200'>
				<Navbar />
			</div>
			<Profile />
			<Subscriptions />
		</div>
	)
}