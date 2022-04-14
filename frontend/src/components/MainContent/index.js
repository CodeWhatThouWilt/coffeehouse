import './MainContent.css'

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
            <div>
                Messaging Area
            </div>
            <div>Member Area</div>
        </div>
    );
};

export default MainContent;