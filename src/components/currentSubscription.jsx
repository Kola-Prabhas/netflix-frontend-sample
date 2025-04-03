import { CheckIcon } from 'lucide-react';
import { tiers } from '../utils/constants';


function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}


export default function CurrentSubscription({ subscription }) {
	const tier = tiers.find(tier => tier.id === subscription.type);
	const expirtyDate = new Date(Date.parse(subscription.expiresOn));

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
						Your Current Subscription
					</p>
				</div>
				<div
					className={classNames(
						'relative mx-auto mt-10 bg-gray-200 h-[500px] w-[400px]',
						'rounded-3xl p-8 ring-1 ring-gray-800/50 sm:p-10',
					)}
				>
					<h3
						className={classNames('text-indigo-400', 'text-base/7 font-semibold')}
					>
						{tier.name}
					</h3>
					<p className="mt-4 flex items-baseline gap-x-2">
						<span
							className={classNames(
								'text-gray-700',
								'text-5xl font-semibold tracking-tight'
							)}
						>
							${subscription.price}
						</span>
					</p>
					<p className={classNames('text-gray-800', 'mt-6 text-base/7')}>
						{tier.description}
					</p>
					<ul
						role="list"
						className={classNames(
							'text-gray-800',
							'mt-8 space-y-3 text-sm/6 sm:mt-10'
						)}
					>
						{tier.features.map((feature) => (
							<li key={feature} className="flex gap-x-3">
								<CheckIcon
									aria-hidden="true"
									className={classNames('text-indigo-400', 'h-6 w-5 flex-none')}
								/>
								{feature}
							</li>
						))}
					</ul>
					<p className='text-indigo-400 font-semibold absolute bottom-6'><span className='text-indigo-300'>Expires On:</span> {expirtyDate.toDateString()}</p>
				</div>
			</div>
		</>
	)
}
