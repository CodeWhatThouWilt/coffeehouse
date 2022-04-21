import './MainContentTopBar.css';

const MainContentTopBar = ({ channel, setShowMembers }) => {

    return (
        <div className='main-content-top-bar'>
            <div className='main-content-top-header-container'>
                <i className="fa-solid fa-hashtag  main-content-hashtag"></i>
                <h3>{channel.name}</h3>
            </div>
        </div>
    );
};

export default MainContentTopBar;