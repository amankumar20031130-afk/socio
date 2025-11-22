import {Navigate, Route, Routes} from 'react-router-dom';

import HomePage from "./pages/auth/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from './pages/auth/notification/NotificationPage';
import ProfilePage from './pages/auth/profile/ProfilePage';
import ChatPage from './pages/chat/ChatPage';

import Sidebar from './components/common/Sidebar';
import RightPanel from './components/common/RightPanel';
import { Toaster, toast } from 'react-hot-toast';
import LoadingSpinner from './components/common/LoadingSpinner';
import { useSocket, SocketContextProvider } from './context/SocketContext';
import { useEffect } from 'react';
import useAuth from './hooks/useAuth';

const AppContent = ({ authUser }) => {
	const { socket } = useSocket();

	useEffect(() => {
		if (socket) {
			socket.on("newMessage", (newMessage) => {
				toast.success(`New message from ${newMessage.senderId.username}`, {
					duration: 3000,
					icon: '💬',
				});
			});
			return () => socket.off("newMessage");
		}
	}, [socket]);

	return (
		<>
			{authUser && <Sidebar />}
			<Routes>
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
				<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" /> } />
				<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' /> } />
				<Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
				<Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
				<Route path='/chat' element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
			</Routes>
			{authUser && <RightPanel />}
			<Toaster />
		</>
	);
};

function App() {
	const { data:authUser, isLoading } = useAuth();

	if(isLoading){
		return (
			<div className='h-screen flex justify-center items-center'>
				<LoadingSpinner size='lg' />
			</div>
		)
	}

	return (
		<div className='flex max-w-6xl mx-auto'>
			<SocketContextProvider authUser={authUser}>
				<AppContent authUser={authUser} />
			</SocketContextProvider>
		</div>
  );
}

export default App;
