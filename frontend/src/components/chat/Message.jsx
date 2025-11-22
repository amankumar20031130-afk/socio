import { formatPostDate } from "../../utils/date";
import useAuth from "../../hooks/useAuth";

const Message = ({ message }) => {
	const { data: authUser } = useAuth();
	const fromMe = message.senderId === authUser._id;
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const bubbleBgColor = fromMe ? "bg-primary text-primary-content" : "bg-base-200 text-base-content";
    const formattedTime = formatPostDate(message.createdAt);

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-bubble text-sm md:text-md rounded-2xl pb-2 max-w-[75%] break-words flex flex-col gap-1 shadow-md ${bubbleBgColor}'>
                <span className={`${bubbleBgColor} px-2 py-1 rounded-lg`}>{message.message}</span>
            </div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};

export default Message;
