import { Link, Navigate, useParams } from "react-router-dom";
import { CheckIcon } from 'lucide-react';


function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}


export default function PaymentSuccess() {
	const params = useParams();
	

	return (
		<>
			{!params.id && <Navigate to="/" replace={true}></Navigate>}

			<main className="grid min-h-full place-items-center bg-white px-6 pt-10 pb-24 sm:pt-16 sm:pb-32 lg:px-8">
				<h1 className="font-serif mt-4 sm:text-3xl font-bold tracking-tight text-indigo-900 mb-20">Subscription Added Successfully</h1>
				<h1 className="mt-4 sm:text-3xl font-bold tracking-tight text-gray-900">Subscription Id #{params.id}</h1>
				<div className="mx-auto grid max-w-lg grid-cols-1 items-center gap-y-6 mt-6 lg:gap-y-0 lg:max-w-6xl lg:grid-cols-3">
					<div
						className={classNames(
							'relative bg-gray-900 shadow-2xl min-h-[300px]',
							'lg:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
							'rounded-3xl px-8 ring-1 ring-gray-800/50 sm:px-10 py-4',
						)}
					>
						<h3
							className={classNames('text-indigo-300', 'text-base/7 font-semibold')}
						>
							Cine Max
						</h3>
						<p className="mt-4 flex items-baseline gap-x-2">
							<span
								className={classNames(
									'text-white',
									'text-5xl font-semibold tracking-tight'
								)}
							>
								$100
							</span>
							<span className={classNames('text-gray-400', 'text-base')}>
								/month
							</span>
						</p>
						<p className={classNames('text-gray-300', 'mt-6 text-base/7')}>
							This is a sample subscription
						</p>
						<ul
							role="list"
							className={classNames(
								'text-gray-300',
								'mt-8 space-y-3 text-sm/6 sm:mt-10 mb-6'
							)}
						>
							<li className="flex gap-x-3">
								<CheckIcon
									aria-hidden="true"
									className={classNames('text-indigo-300', 'h-6 w-5 flex-none')}
								/>
								Nice Feature
							</li>
						</ul>

						<p className='w-full text-center absolute left-[50%] -translate-x-1/2 bottom-4 font-medium text-gray-300'>Expires On: <span className='text-indigo-300'>23-10-2003</span></p>
					</div>
				</div>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Link
						to="/"
						className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Go to Home
					</Link>
				</div>
			</main>
		</>
	)
};