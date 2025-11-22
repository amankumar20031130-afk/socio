import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";

const MessageContainer = ({ selectedConversation }) => {
	const { messages, isLoading } = useGetMessages(selectedConversation?._id);
    useListenMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='md:min-w-[450px] flex flex-col h-full w-full'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-base-200 px-4 py-2 mb-2 flex items-center gap-2'>
						<span className='label-text text-base-content/60'>To:</span>{" "}
						<span className='text-base-content font-bold'>{selectedConversation.fullName}</span>
					</div>

					<div className='flex-1 overflow-auto px-4'>
						{!isLoading &&
							messages?.length > 0 &&
							messages.map((message) => (
								<div key={message._id} ref={lastMessageRef}>
									<Message message={message} />
								</div>
							))}

						{!isLoading && messages?.length === 0 && (
							<p className='text-center text-base-content/60 my-4'>Send a message to start the conversation</p>
						)}
                        {isLoading && (
                             <div className='flex flex-col gap-4 w-full p-4'>
                                <div className="skeleton h-10 w-1/2 self-start rounded-full"></div>
                                <div className="skeleton h-10 w-1/2 self-end rounded-full"></div>
                                <div className="skeleton h-10 w-1/2 self-start rounded-full"></div>
                             </div>
                        )}
					</div>

					<MessageInput receiverId={selectedConversation._id} />
				</>
			)}
		</div>
	);
};

const NoChatSelected = () => {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-base-content font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};

export default MessageContainer;
