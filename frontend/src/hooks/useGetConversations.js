import { useQuery } from "@tanstack/react-query";

const useGetConversations = () => {
    const { data: conversations, isLoading, isError, error } = useQuery({
        queryKey: ["conversations"],
        queryFn: async () => {
            try {
                const res = await fetch("/api/messages/conversations");
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
    });

    return { conversations, isLoading, isError, error };
};

export default useGetConversations;
