import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, StarIcon } from 'lucide-react';
import { useSubscriptionStore } from '../store/subscription';
import { useAuthStore } from '../store/authUser';
import {tiers, longTiers} from '../utils/constants';




function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}


export default function Subscriptions({user}) {
	const createSubscription = useSubscriptionStore((state) => state.createSubscription);
	const currentSubscription = useSubscriptionStore((state) => state.currentSubscription);

	const navigate = useNavigate();

	useEffect(() => {
		if (currentSubscription) {
			navigate('/stripe-checkout', {
				state: {
					userId: user._id,
					totalPrice: currentSubscription.price,
				}
			})
		}
	}, [currentSubscription, navigate, user._id])
	

	return (
		<>
			<p className='font-mono px-10 pt-4 text-lg sm:text-4xl text-gray-200 font-semibold'>Subscription Plans</p>
			<div className='w-full mt-2 h-[1px] bg-blue-400' />
			<div className="relative isolate px-6 py-20 sm:py-26 lg:px-8">
				<div
					aria-hidden="true"
					className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
				>
					<div
						style={{
							clipPath:
								'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
						}}
						className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
					/>
				</div>
				<div className="mx-auto max-w-4xl text-center">
					<p className="mt-2 text-5xl font-semibold tracking-tight text-gray-100 sm:text-6xl">
						Choose the right plan for you
					</p>
				</div>
				<p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-gray-300 sm:text-xl/8">
					Choose an affordable plan that’s packed with the best features that suits your needs.
				</p>
				<div>
					<h2 className="mt-16 -mb-16 text-2xl text-center font-semibold text-indigo-400">Monthly Plans</h2>
					<div className="mx-auto grid max-w-lg grid-cols-1 items-center gap-y-6 lg:mt-20 lg:gap-y-0 lg:max-w-6xl lg:grid-cols-3">
						{tiers.map((tier, tierIdx) => (
							<div
								key={tier.id}
								className={classNames(
									tier.featured
										? 'relative bg-gray-900 shadow-2xl h-[550px]'
										: 'bg-gray-200 sm:mx-8 lg:mx-0 h-[500px]',
									tier.featured
										? ''
										: tierIdx === 0
											? 'rounded-t-3xl lg:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
											: 'lg:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
									'rounded-3xl p-8 ring-1 ring-gray-800/50 sm:p-10',
									'relative'
								)}
							>
								{tier.featured && (
									<div className='absolute top-2 right-4 flex items-center justify-center gap-1'>
										<StarIcon className='size-4 text-gray-300'/>
										<p className='text-indigo-400 font-semibold'>Most Popular</p>
									</div>
								)}
								<h3
									id={tier.id}
									className={classNames(tier.featured ? 'text-indigo-300' : 'text-indigo-400', 'text-base/7 font-semibold')}
								>
									{tier.name}
								</h3>
								<p className="mt-4 flex items-baseline gap-x-2">
									<span
										className={classNames(
											tier.featured ? 'text-white' : 'text-gray-700',
											'text-5xl font-semibold tracking-tight'
										)}
									>
										{tier.priceUnit}{tier.priceMonthly}
									</span>
									<span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-800', 'text-base')}>
										/month
									</span>
								</p>
								<p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-800', 'mt-6 text-base/7')}>
									{tier.description}
								</p>
								<ul
									role="list"
									className={classNames(
										tier.featured ? 'text-gray-300' : 'text-gray-800',
										'mt-8 space-y-3 text-sm/6 sm:mt-10'
									)}
								>
									{tier.features.map((feature) => (
										<li key={feature} className="flex gap-x-3">
											<CheckIcon
												aria-hidden="true"
												className={classNames(tier.featured ? 'text-indigo-300' : 'text-indigo-400', 'h-6 w-5 flex-none')}
											/>
											{feature}
										</li>
									))}
								</ul>
								<button
									aria-describedby={tier.id}
									className={classNames(
										tier.featured
											? 'bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500'
											: 'text-indigo-400 ring-1 ring-indigo-600 ring-inset hover:ring-indigo-500 focus-visible:outline-indigo-400',
										'absolute bottom-8 left-1/2 -translate-x-1/2 mt-8 block rounded-md px-7 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10'
									)}
									onClick={() => {
										createSubscription({
											type: tier.id,
											price: tier.priceMonthly,
											expiresOn: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
											paymentStatus: 'unpaid',
											userId: user._id,
										});
									}}
								>
									Subscribe
								</button>
							</div>
						))}
					</div>
				</div>

				<div>
					<h2 className="mt-16 -mb-16 text-2xl text-center font-semibold text-indigo-400">Yearly Plans</h2>
					<div className="mx-auto grid max-w-lg grid-cols-1 items-center gap-y-6 lg:mt-20 lg:gap-y-0 lg:max-w-6xl lg:grid-cols-3">
						{longTiers.map((tier, tierIdx) => (
							<div
								key={tier.id}
								className={classNames(
									tier.featured
										? 'relative bg-gray-900 shadow-2xl h-[550px]'
										: 'bg-gray-200 sm:mx-8 lg:mx-0 h-[500px]',
									tier.featured
										? ''
										: tierIdx === 0
											? 'rounded-t-3xl lg:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
											: 'lg:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
									'rounded-3xl p-8 ring-1 ring-gray-800/50 sm:p-10',
									'relative'
								)}
							>
								{tier.featured && (
									<div className='absolute top-2 right-4 flex items-center justify-center gap-1'>
										<StarIcon className='size-4 text-gray-300' />
										<p className='text-indigo-400 font-semibold'>Most Popular</p>
									</div>
								)}
								<h3
									id={tier.id}
									className={classNames(tier.featured ? 'text-indigo-300' : 'text-indigo-400', 'text-base/7 font-semibold')}
								>
									{tier.name}
								</h3>
								<p className="mt-4 flex items-baseline gap-x-2">
									<span
										className={classNames(
											tier.featured ? 'text-white' : 'text-gray-700',
											'text-5xl font-semibold tracking-tight'
										)}
									>
										{tier.priceUnit}{tier.priceYearly}
									</span>
									<span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-800', 'text-base')}>
										/year
									</span>
								</p>
								<p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-800', 'mt-6 text-base/7')}>
									{tier.description}
								</p>
								<ul
									role="list"
									className={classNames(
										tier.featured ? 'text-gray-300' : 'text-gray-800',
										'mt-8 space-y-3 text-sm/6 sm:mt-10'
									)}
								>
									{tier.features.map((feature) => (
										<li key={feature} className="flex gap-x-3">
											<CheckIcon
												aria-hidden="true"
												className={classNames(tier.featured ? 'text-indigo-300' : 'text-indigo-400', 'h-6 w-5 flex-none')}
											/>
											{feature}
										</li>
									))}
								</ul>
								<button
									href={tier.href}
									aria-describedby={tier.id}
									className={classNames(
										tier.featured
											? 'bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500'
											: 'text-indigo-400 ring-1 ring-indigo-600 ring-inset hover:ring-indigo-500 focus-visible:outline-indigo-400',
										'absolute bottom-8 left-1/2 -translate-x-1/2 mt-8 block rounded-md px-7 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10'
									)}
									onClick={() => {
										createSubscription({
											type: tier.id,
											price: tier.priceYearly,
											expiresOn: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 360 days from now
											paymentStatus: 'unpaid',
											userId: user._id
										});
									}}
								>
									Subscribe
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}
