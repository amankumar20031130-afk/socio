import { useQuery } from "@tanstack/react-query";

const useGetMessages = (conversationId) => {
    const { data: messages, isLoading, isError, error } = useQuery({
        queryKey: ["messages", conversationId],
        queryFn: async () => {
            try {
                const res = await fetch(`/api/messages/${conversationId}`);
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
        enabled: !!conversationId,
    });

    return { messages, isLoading, isError, error };
};

export default useGetMessages;
