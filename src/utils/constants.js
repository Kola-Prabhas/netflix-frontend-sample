export const SMALL_IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const ORIGINAL_IMG_BASE_URL = "https://image.tmdb.org/t/p/original";

export const MOVIE_CATEGORIES = ["now_playing", "top_rated", "popular", "upcoming"];
export const TV_CATEGORIES = ["airing_today", "on_the_air", "popular", "top_rated"];

export const tiers = [
	{
		name: 'Basic Stream',
		id: 'basic',
		priceMonthly: '49',
		priceUnit: '$',
		description: "The perfect plan for single user.",
		features: [
			'1 device',
			'Playable Trailers',
		],
		featured: false,
	},
	{
		name: 'CineMax',
		id: 'cinemax',
		priceMonthly: '99',
		priceUnit: '$',
		description: 'Affordable plan for the family with multiple devices support.',
		features: [
			'2 devices',
			'Playable Trailers',
			'Access to Tv Shows',
		],
		featured: true,
	},
	{
		name: 'UltraFlix',
		id: 'ultraflix',
		priceMonthly: '149',
		priceUnit: '$',
		description: "Our premium plan for families that gives most of our platform features.",
		features: [
			'4 devices',
			'Playable Trailers',
			'Access to Tv Shows',
			'Chatbot support'
		],
		featured: false,
	},
]

export const longTiers = [
	{
		name: 'Basic Stream',
		id: 'basic',
		priceYearly: '580',
		priceUnit: '$',
		description: "The perfect plan for single user.",
		features: [
			'1 device',
			'Playable Trailers',
		],
		featured: false,
	},
	{
		name: 'CineMax',
		id: 'cinemax',
		priceYearly: '1100',
		priceUnit: '$',
		description: 'Affordable plan for the family with multiple devices support.',
		features: [
			'2 devices',
			'Playable Trailers',
			'Access to Tv Shows',
		],
		featured: true,
	},
	{
		name: 'UltraFlix',
		id: 'ultraflix',
		priceYearly: '1700',
		priceUnit: '$',
		description: "Our premium plan for families that gives most of our platform features.",
		features: [
			'4 devices',
			'Playable Trailers',
			'Access to Tv Shows',
			'Chatbot support'
		],
		featured: false,
	},
]