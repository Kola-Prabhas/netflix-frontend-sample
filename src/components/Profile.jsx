export default function Profile({user}) {
	
	return (
		<div>
			<p className='font-mono px-10 pt-4 text-lg sm:text-4xl text-gray-200 font-semibold'>Profile Information</p>
			<div className='w-full mt-2 h-[1px] bg-blue-300'/>

			<div className='px-8 lg:px-20 pb-10 sm:py-16 flex items-center gap-x-30'>
				<img src='/avatar2.png' alt='avatar' />
				<div className='text-3xl space-y-4 font-medium text-gray-300 '>
					<p><span className='text-gray-600'>Name:</span> <span className='font-serif'>{user.username}</span></p>
					<p><span className='text-gray-600'>Email:</span> <span className='font-serif'>{user.email}</span></p>
					<p><span className='text-gray-600'>Subscription:</span> <span className='font-serif'>{user.subscription ? 'Subscribed' : 'Not Subscribed'}</span></p>
				</div>
			</div>
		</div>
	)
}

