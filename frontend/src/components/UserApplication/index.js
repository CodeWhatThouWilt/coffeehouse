import './UserApplication.css';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import MainContent from '../MainContent';
import { Route, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserServers } from '../../store/servers';
import NoChannelsToDisplay from '../NoChannelsToDisplay';
import SelectAServer from '../SelectAServer';
import { useParams } from 'react-router-dom';
import SelectAChannel from '../SelectAChannel';

const UserApplication = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const dispatch = useDispatch();
	const { serverId, channelId } = useParams();
	const session = useSelector((state) => state.session);
	const channels = useSelector((state) => state.channels);

	// TODO change rendering logic etc within UserApplication and lower components to be more simplified

	useEffect(() => {
		dispatch(getUserServers()).then(() => setIsLoaded(true));
	}, [dispatch]);

	if (!session.user) return <Redirect to="/login" />;

	return (
		<div className="application-container">
			{isLoaded && (
				<>
					<Navbar />
					<Sidebar />
					{channelId && <MainContent />}
					{serverId &&
						!channelId &&
						Object.values(channels).length > 0 && (
							<SelectAChannel />
						)}
					{serverId &&
						!channelId &&
						Object.values(channels).length < 1 && (
							<NoChannelsToDisplay />
						)}
					{!serverId && !channelId && <SelectAServer />}
				</>
			)}
		</div>
	);
};

export default UserApplication;