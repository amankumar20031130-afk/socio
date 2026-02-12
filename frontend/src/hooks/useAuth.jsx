import { useQuery } from '@tanstack/react-query';

const useAuth = () => {
	return useQuery({
		queryKey: ['authUser'],
		queryFn: async () => {
			try {
				const res = await fetch(
					"https://socio-cxuo.onrender.com/api/auth/me",
					{
						credentials: "include", // ⭐ important
					}
				);

				const data = await res.json();

				if (!res.ok || data.error) return null;

				return data;
			} catch (error) {
				console.error("Auth check failed:", error);
				return null;
			}
		},
		retry: false,
	});
};

export default useAuth;
