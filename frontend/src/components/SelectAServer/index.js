import './SelectAServer.css';
import noChannelSVG from '../../assets/no-channel-svg.svg';

const SelectAServer = () => {

    return (
        <div className='no-channel-container'>
            <div className='no-channel-inner-container'>
                <img src={noChannelSVG} alt='no channel' />
                <div className='no-channel-header'>NO SERVER SELECTED</div>
                <div className='no-channel-text'>You find yourself in a strange place.
                    Until you enter a server you'll find yourself 
                    staring into this abyss.</div>
            </div>
        </div>
    );
};

export default SelectAServer;