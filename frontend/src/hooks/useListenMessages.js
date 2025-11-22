import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
// import notificationSound from "../assets/sounds/notification.mp3"; // Assuming I'll add a sound later, or just remove if not needed.

const useListenMessages = () => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            // const sound = new Audio("/notification.mp3");
            // sound.play();

            // Update the messages cache for the specific conversation
            queryClient.setQueryData(["messages", newMessage.senderId], (oldMessages) => {
                if (!oldMessages) return [newMessage];
                return [...oldMessages, newMessage];
            });

            // Also invalidate conversations to update last message if I had that feature, or just to refresh the list order
            // queryClient.invalidateQueries({ queryKey: ["conversations"] });
        });

        return () => {
            socket.off("newMessage");
        };
    }, [socket, queryClient]);
};

export default useListenMessages;
