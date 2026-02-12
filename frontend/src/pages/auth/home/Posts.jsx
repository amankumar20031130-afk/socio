import { data } from "react-router-dom";
import Post from "../../../components/common/Post";
import PostSkeleton from "../../../components/skeletons/PostSkeleton";
import { useQuery } from '@tanstack/react-query';
import { useEffect } from "react";

const Posts = ({ feedType, username, userId }) => {
	const API_BASE = "https://socio-cxuo.onrender.com";

	const getPostEndpoint = () => {
		switch (feedType) {
			case "forYou":
				return `${API_BASE}/api/posts/all`;
			case "following":
				return `${API_BASE}/api/posts/following`;
			case "posts":
				return `${API_BASE}/api/posts/user/${username}`;
			case "likes":
				return `${API_BASE}/api/posts/likes/${userId}`;
			default:
				return `${API_BASE}/api/posts/all`;
		}
	};

	const POST_ENDPOINT = getPostEndpoint();

	const {
		data: posts,
		isLoading,
		refetch,
		isRefetching,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			try {
				const res = await fetch(POST_ENDPOINT,{
					credentials: "include",
				});
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}

				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
	});

	useEffect(() => {
		refetch();
	}, [feedType, refetch, username]);

	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && (
				<p className='text-center my-4'>No posts in this tab. Switch 👻</p>
			)}
			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;