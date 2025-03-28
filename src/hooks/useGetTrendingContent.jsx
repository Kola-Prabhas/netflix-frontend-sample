import { useEffect, useState } from 'react';
import { useContentStore } from '../store/content';
import axios from 'axios';
import { baseUrl } from '../envVars';

const useGetTrendingContent = () => {
	const [trendingContent, setTrendingContent] = useState(null);
	const { contentType } = useContentStore();
	useEffect(() => {
		const getTrendingContent = async () => {
			const res = await axios.get(`${baseUrl}/api/v1/${contentType}/trending`, {
				withCredentials: true,
			});
			setTrendingContent(res.data.content);
		};
		getTrendingContent();
	}, [contentType]);
	return { trendingContent };
};

export default useGetTrendingContent;