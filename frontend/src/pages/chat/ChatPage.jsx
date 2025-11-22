import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ConversationSidebar from "../../components/chat/ConversationSidebar";
import MessageContainer from "../../components/chat/MessageContainer";

const ChatPage = () => {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.selectedUser) {
            setSelectedConversation(location.state.selectedUser);
        }
    }, [location.state]);

	return (
		<div className='flex-[4_4_0] border-r border-base-300 min-h-screen flex items-start justify-center pt-6'>
            <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-base-100 border border-base-300 w-full max-w-4xl mx-4 shadow-xl'>
			    <ConversationSidebar onSelectConversation={setSelectedConversation} selectedConversation={selectedConversation} />
			    <MessageContainer selectedConversation={selectedConversation} />
            </div>
		</div>
	);
};

export default ChatPage;
