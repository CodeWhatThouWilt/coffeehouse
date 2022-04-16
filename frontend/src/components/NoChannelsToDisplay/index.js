import './NoChannelsToDisplay.css';
import noChannelSVG from '../../assets/no-channel-svg.svg';

const NoChannelsToDisplay = () => {

    return (
        <div className='no-channel-container'>
            <div className='no-channel-inner-container'>
                <img src={noChannelSVG} alt='no channel'/>
                <div className='no-channel-header'>NO TEXT CHANNELS</div>
                <div className='no-channel-text'>You find yourself in a strange place.
                    You don't have access to any text channels,
                    or there are none in this server.</div>
            </div>
        </div>
    );
};

export default NoChannelsToDisplay;