import { useQuery } from '@tanstack/react-query';

const useAuth = () => {
	return useQuery({
		queryKey: ['authUser'],
		queryFn: async () => {
			try {
				const res = await fetch("/api/auth/me");
				let data;
				const text = await res.text();
				try {
					data = JSON.parse(text);
				} catch (e) {
					// If it's the home page (HTML), return null (not logged in)
					if (text.includes("<!DOCTYPE html>")) return null;
					console.error("Failed to parse JSON response:", text);
					return null;
				}

				if (data.error) return null;
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
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
