import { useContentStore } from '../store/content';
import Navbar from '../components/Navbar';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from 'react-player';
import { formatReleaseDate } from '../utils/dateFunction';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants';
import WatchPageSkeleton from '../components/skeletons/WatchPageSkeleton';
import { baseUrl } from '../envVars';
import { LockKeyhole } from 'lucide-react';
import { useAuthStore } from '../store/authUser';
import { isActive } from '../utils/activeSubscription';

const WatchPage = () => {
	const { id } = useParams();
	const [trailers, setTrailers] = useState([]);
	const [currentTrailerId, setCurrentTrailerId] = useState(0);
	const [loading, setLoading] = useState(true);
	const [content, setContent] = useState({});
	const [similarContent, setSimilarContent] = useState([]);
	const { contentType } = useContentStore();
	const { user } = useAuthStore();
	const subscription = user.subscription;
	const active = isActive(subscription);

	const sliderRef = useRef(null);

	useEffect(() => {
		const getTrailers = async () => {
			try {
				const res = await axios.get(`${baseUrl}/api/v1/${contentType}/${id}/trailers`, {
					withCredentials: true,
				});
				setTrailers(res.data.trailers);
			} catch (error) {
				if (error.message.includes('404')) {
					setTrailers([]);
				}
			}
		};
		getTrailers();
	}, [contentType, id]);

	useEffect(() => {
		const getSimilarContent = async () => {
			try {
				const res = await axios.get(`${baseUrl}/api/v1/${contentType}/${id}/similar`, {
					withCredentials: true,
				});
				setSimilarContent(res.data.content.results);
				// console.log(res.data);
			} catch (error) {
				setSimilarContent([]);
			}
		};
		getSimilarContent();
	}, [contentType, id]);

	useEffect(() => {
		const getContentDetails = async () => {
			try {
				const res = await axios.get(`${baseUrl}/api/v1/${contentType}/${id}/details`, {
					withCredentials: true,
				});
				setContent(res.data.content);
			} catch (error) {
				if (error.message.include('404')) {
					setContent(null);
				}
			} finally {
				setLoading(false);
			}
		};
		getContentDetails();
	}, [contentType, id]);

	const handleNext = () => {
		if (currentTrailerId < trailers.length - 1)
			setCurrentTrailerId(currentTrailerId + 1);
	};

	const handlePrev = () => {
		if (currentTrailerId > 0) setCurrentTrailerId(currentTrailerId - 1);
	};

	const scrollLeft = () => {
		if (sliderRef.current)
			sliderRef.current.scrollBy({
				left: -sliderRef.current.offsetWidth,
				behavior: 'smooth',
			});
	};

	const scrollRight = () => {
		if (sliderRef.current)
			sliderRef.current.scrollBy({
				left: sliderRef.current.offsetWidth,
				behavior: 'smooth',
			});
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-black p-10">
				<WatchPageSkeleton />
			</div>
		);
	}

	if (!content) {
		return (
			<div className="bg-black text-white h-screen">
				<div className="max-w-6xl mx-auto">
					<Navbar />
					<div className="text-center mx-auto px-4 py-8 h-full mt-40">
						<h2 className="text-2xl sm:text-5xl font-bold text-balance">
							Content not found 😥
						</h2>
					</div>
				</div>
			</div>
		);
	}


	return (
		<div className="bg-black min-h-screen text-white">
			<div className="mx-auto container px-4 gap-y-8 h-full">
				<Navbar />
				{trailers.length > 0 && (
					<div className="flex justify-between items-center mb-4">
						<button
							className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerId === 0 ? 'opacity-50 cursor-not-allowed' : ''
								}`}
							disabled={currentTrailerId === 0}
							onClick={handlePrev}
						>
							<ChevronLeft size={24} />
						</button>
						<button
							className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerId === trailers?.length - 1
								? 'opacity-50 cursor-not-allowed'
								: ''
								} `}
							disabled={currentTrailerId === trailers?.length - 1}
							onClick={handleNext}
						>
							<ChevronRight size={24} />
						</button>
					</div>
				)}
				<div className="relative aspect-video mb-8 p-1 h-[60vh] w-full sm:px-10 md:px-32">
					{trailers?.length > 0 && (
						<>
							{!active && <div className="flex items-center justify-center gap-2 absolute inset-0 bg-black/50 rounded-lg">
								<LockKeyhole className='size-6 text-orange-500' />
								<p className='text-gray-200 font-bold text-2xl font-serif'>Subscription Needed!</p>
							</div>}
							<ReactPlayer
								muted={true}
								playing={active}
								loop={true}
								controls={true}
								width={'100%'}
								height={'60vh'}
								className="mx-atuo overflow-hidden rounded-lg"
								url={`https://www.youtube.com/watch?v=${trailers[currentTrailerId].key}`}
							/>
						</>
					)}
					{trailers?.length === 0 && (
						<h2 className="text-xl text-center mt-5">
							No trailers available for{' '}
							<span className="font-bold text-red-600">
								{content?.title || content?.name}
							</span>
						</h2>
					)}
				</div>
				{/* movie details */}
				<div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
					<div className="mb-4 md:mb-0">
						<h2 className="text-5xl font-bold text-balance">
							{content?.title || content?.name}
						</h2>
						<p className="mt-2 text-lg">
							{formatReleaseDate(
								content?.release_date || content?.first_air_date
							)}{' '}
							|{' '}
							{content?.adult ? (
								<span className="text-red-600">18+</span>
							) : (
								<span className="text-green-600">PG-13</span>
							)}
							<p className="mt-4 text-lg">{content?.overview}</p>
						</p>
					</div>
					<img
						src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
						alt="poster image"
						className="max-h-[400px] rounded-md"
					/>
				</div>
				{similarContent?.length > 0 && (
					<div className="mt-12">
						<h3 className="text-3xl font-semibold mb-4">
							Similar Movies/Tv Shows
						</h3>
						<div
							className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
							ref={sliderRef}
						>
							{similarContent?.map((content) => {
								if (content.poster_path === null) return null;
								return (
									<Link
										key={content.id}
										to={`/watch/${content.id}`}
										className="w-52 flex-none"
									>
										<img
											src={SMALL_IMG_BASE_URL + content?.poster_path}
											alt="Poster path"
											className="w-full h-auto rounded-md"
										/>
										<h4 className="mt-2 text-lg font-semibold">
											{content?.title || content?.name}
										</h4>
									</Link>
								);
							})}
							<ChevronRight
								className="absolute -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-red-600 text-white rounded-full"
								onClick={scrollRight}
							/>
							<ChevronLeft
								className="absolute  -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 
								text-white rounded-full"
								onClick={scrollLeft}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default WatchPage;