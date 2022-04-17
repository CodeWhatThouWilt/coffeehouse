import './MainContent.css';
import MessagingArea from '../MessagingArea';
import MemberArea from '../MemberArea';
import MainContentTopBar from '../MainContentTopBar';
import { useParams } from 'react-router-dom';
import { getChannelMessages } from '../../store/servers';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const MainContent = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const { serverId, channelId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getChannelMessages({ serverId, channelId }))
            .then(res => setIsLoaded(true))
    }, [dispatch]);


    return (
        <div className='main-content-container'>
            <MainContentTopBar />
            <div className='main-content-inner-container'>
                {isLoaded &&
                    <MessagingArea />
                }
                <MemberArea />
            </div>
        </div>
    );
};

export default MainContent;