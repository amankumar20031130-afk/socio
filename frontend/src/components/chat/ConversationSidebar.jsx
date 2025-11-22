import useGetConversations from "../../hooks/useGetConversations";
import { useQueryClient } from "@tanstack/react-query";

const ConversationSidebar = ({ onSelectConversation, selectedConversation }) => {
	const { conversations, isLoading } = useGetConversations();

	return (
		<div className='border-r border-base-300 flex flex-col w-20 md:w-80'>
			<div className='p-4 font-bold border-b border-base-300 hidden md:block'>Messages</div>
			<div className='flex flex-col overflow-auto'>
				{isLoading && <span className='loading loading-spinner mx-auto mt-4'></span>}
				{conversations?.map((conversation) => (
					<div
						key={conversation._id}
						className={`flex gap-2 items-center p-2 py-3 cursor-pointer hover:bg-base-200 transition-all
                            ${selectedConversation?._id === conversation._id ? "bg-base-200" : ""}
                        `}
						onClick={() => onSelectConversation(conversation)}
					>
						<div className='avatar online'>
							<div className='w-12 rounded-full'>
								<img src={conversation.profileImg || "/avatar-placeholder.png"} alt='user avatar' />
							</div>
						</div>

						<div className='flex flex-col flex-1 hidden md:flex'>
							<div className='flex gap-3 justify-between'>
								<p className='font-bold text-base-content'>{conversation.fullName}</p>
							</div>
                            <p className='text-sm text-base-content/60'>@{conversation.username}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ConversationSidebar;
