import Profile from "../components/Profile";
import Subscriptions from "../components/Subscriptions";
import Navbar from "../components/Navbar";
import { useAuthStore } from '../store/authUser';
import { isActive } from '../utils/activeSubscription';
import CurrentSubscription from "../components/currentSubscription";


export default function ProfilePage() {
	const user = useAuthStore((state) => state.user);
	const subscription = user.subscription;
	const active = isActive(subscription);

	return (
		<div className='bg-gray-900'>
			<div className='text-gray-200'>
				<Navbar />
			</div>
			<Profile user={user} />
			{active ? (
				<CurrentSubscription subscription={subscription} />
			) : (
				<Subscriptions user={user} />
			)}
		</div>
	)
}