import './SelectAChannel.css';
import noChannelSVG from '../../assets/no-channel-svg.svg';

const SelectAChannel = () => {

    return (
        <div className='no-channel-container'>
            <div className='no-channel-inner-container'>
                <img src={noChannelSVG} alt='no channel' />
                <div className='no-channel-header'>NO CHANNEL SELECTED</div>
                <div className='no-channel-text'>You find yourself in a strange place.
                    Until you select a channel you'll find yourself
                    staring into this abyss. You might be into that kind of thing though.</div>
            </div>
        </div>
    );
};

export default SelectAChannel;