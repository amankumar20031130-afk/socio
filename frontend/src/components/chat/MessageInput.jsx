import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = ({ receiverId }) => {
	const [message, setMessage] = useState("");
	const { sendMessage, isSending } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage({ message, receiverId });
		setMessage("");
	};

	return (
		<form className='px-4 my-3' onSubmit={handleSubmit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5 bg-base-200 border-base-300 text-base-content focus:outline-none focus:border-primary'
					placeholder='Send a message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3 text-base-content/60 hover:text-primary'>
					{isSending ? <span className='loading loading-spinner'></span> : <BsSend />}
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
