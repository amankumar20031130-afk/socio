import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useSendMessage = () => {
    const queryClient = useQueryClient();

    const { mutate: sendMessage, isPending: isSending } = useMutation({
        mutationFn: async ({ message, receiverId }) => {
            try {
                const res = await fetch(`https://socio-cxuo.onrender.com/api/messages/send/${receiverId}`, {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message }),
                });
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
        onSuccess: (newMessage, { receiverId }) => {
            queryClient.invalidateQueries({ queryKey: ["messages", receiverId] });
            // Optimistic update could be added here for better UX
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { sendMessage, isSending };
};

export default useSendMessage;
