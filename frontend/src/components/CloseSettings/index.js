import './CloseSettings.css';
import { useEffect } from 'react';

const CloseSettings = ({ setShowModal }) => {

    const keyPressHandler = (e) => {
        const key = e.key;
        console.log("##############", key);
        if (key === 'Escape') {
            setShowModal(false);
        };
    };

    useEffect(() => {
        document.addEventListener("keydown", keyPressHandler);
        return () => document.removeEventListener("keydown", keyPressHandler);
    }, []);

    return (
        <div className='close-settings-container'>
            <div className='close-settings-spacer' />
            <div onClick={() => setShowModal(false)} className='close-settings-circle'>
                <i className="fa-solid fa-xmark" />
            </div>
            <div className='close-settings-text'>
                esc
            </div>
        </div>
    );
};

export default CloseSettings;