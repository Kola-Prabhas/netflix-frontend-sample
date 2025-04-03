import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import Navbar from '../components/Navbar';
// import LoadingSpinner from '../components/LoadingSpinner';
import LoadingDots from '../components/LoadingDots';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authUser';
import { isActive } from '../utils/activeSubscription';



const Question = ({ question }) => {
	return (
		<div className='flex items-center justify-end'>
			<p className='rounded-2xl px-4 py-2 bg-gray-200 text-black font-medium'>{question}</p>
		</div>
	)
}

const ChatPage = () => {
	const { user } = useAuthStore();
	const subscription = user?.subscription;
	const active = isActive(subscription);

	const [message, setMessage] = useState('');
	const [responseLoading, setResponseLoading] = useState(false);
	const [chatHistory, setChatHistory] = useState(() => {
		const history = sessionStorage.getItem("chatHistory");
		return history ? JSON.parse(history) : [];
	});

	useEffect(() => {
		sessionStorage.setItem("chatHistory", JSON.stringify(chatHistory));
	}, [chatHistory]);


	const handleSendMessage = async () => {
		setResponseLoading(true);
		if (message.trim()) {
			const userMessage = { question: message, answer: 'loading' };
			setChatHistory([...chatHistory, userMessage]);

			try {
				const response = await axios.post('http://localhost:5000/api/v1/chat', { message });
				const botMessage = response.data.content;

				setChatHistory([...chatHistory.slice(0, chatHistory.length), { question: message, answer: botMessage }]);
			} catch (error) {
				setChatHistory([...chatHistory.slice(0, chatHistory.length - 1)]);
				toast.error('An error occurred. Please try again later');

				console.error('Error fetching chatbot response', error);
			}

			setMessage('');
		}
		setResponseLoading(false);
	};

	return (
		<div className='bg-gray-100 min-h-[100vh]'>
			<div className='text-gray-200 bg-gray-900'>
				<Navbar />
			</div>
			{active && subscription.type == 'ultraflix' ? (
				<div className='h-[100vh] space-y-6 max-sm:mx-6 sm:w-[70%] max-w-6xl mx-auto'>
					{chatHistory.length == 0 ? (
						<div className='h-[70%] flex items-center justify-center overflow-y-auto bg-gray-100/90'>
							Ask something to chat...
						</div>
					) : (
						<div className='h-[70%] overflow-y-auto scrollbar-hide bg-gray-100/90 mt-10'>
							{chatHistory.map((msg, index) => (
								<div
									key={index}
									className='mb-6'
								>
									<Question question={msg.question} />
									{msg.answer == 'loading' ? (
										<LoadingDots />
									) : (
										<ReactMarkdown>{msg.answer}</ReactMarkdown>
									)}
								</div>
							))}
						</div>
					)}

					<div className='flex items-center'>
						<input
							type="text"
							value={message}
							disabled={responseLoading}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Type your message..."
							className='w-full focus:outline-none py-2 rounded-xl pl-4 pr-20 border border-black/50'
						/>
						<button
							disabled={message === '' || responseLoading}
							onClick={handleSendMessage}
							className={`${responseLoading ? 'cursor-not-allowed' : 'cursor-pointer'} flex items-center justify-center w-[65px] h-[40px] -ml-[65px] bg-indigo-400 hover:bg-indigo-500 text-gray-200 rounded-xl px-4 py-2 font-medium`}
						>
							Send
						</button>
					</div>
				</div>
			) : (
				<div className='h-[100vh] flex items-center justify-center text-xl font-medium  space-y-6 max-sm:mx-6 sm:w-[70%] max-w-6xl mx-auto'>
					{active ? (
						<p>Your current subscription doesn't include this feature.</p>
					) : (
						<p>Please subscribe to access this feature.</p>
					)}
				</div>
			)}

		</div>
	);
};

export default ChatPage;
