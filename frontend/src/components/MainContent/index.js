import './MainContent.css';
import MessagingArea from '../MessagingArea';
import MemberArea from '../MemberArea';
import MainContentTopBar from '../MainContentTopBar';

const MainContent = () => {

    return (
        // <Route path='/channels/:serverId/:channelId'>
        //       </Route>
        <div className='main-content-container'>
            <MainContentTopBar />
            <div className='main-content-inner-container'>
                <MessagingArea />
                <MemberArea />
            </div>
        </div>
    );
};

export default MainContent;