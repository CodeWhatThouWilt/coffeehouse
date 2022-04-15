import './MainContent.css';
import MessagingArea from '../MessagingArea';
import MemberArea from '../MemberArea';

const MainContent = () => {

    return (
        // <Route path='/channels/:serverId/:channelId'>
        //       </Route>
        <div>
            <div className='main-content-top-bar'>
                <div>
                    Selected Channel
                </div>
            </div>
            <MessagingArea />
            <MemberArea />
        </div>
    );
};

export default MainContent;