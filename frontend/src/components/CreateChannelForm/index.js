import './CreateChannelForm.css';
import { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createChannel } from '../../store/servers';
import unfilledRadio from '../../assets/unfilledRadio.svg';
import filledRadio from '../../assets/filledInRadio.svg';

const CreateChannelForm = ({}) => {
    const dispatch = useDispatch();
    const { serverId } = useParams();
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);

    const submitHandler = () => {
        dispatch(createChannel({ name, serverId }))
        .catch(res => {
            const data = res.json();
            data.errors && setErrors(data.errors);
        });
    };

    return (
        <form onSubmit={() => submitHandler()}>
            <div className='create-channel-container'>
                <div className='create-channel-top-text'>
                    <h1>
                        Create Text Channel
                    </h1>
                </div>
                <div className='create-channel-mid-section-container'>
                    <div className='create-channel-channel-name-header'>
                        CHANNEL NAME
                    </div>
                    <div className='create-channel-input-container'>
                        <i className="fa-solid fa-hashtag hashtag-icon" />
                        <input
                            value={name}
                            placeholder='new-channel'
                            onChange={e => setName(e.target.value.replace(' ', '-').toLowerCase())}
                        />
                    </div>
                    <div className='create-channel-error-container'>
                        {errors.map(error => (
                            <div>{error}</div>
                        ))}
                    </div>
                </div>
                <div className='create-channel-bottom-container'>
                    <div className='create-channel-cancel'>
                        Cancel
                    </div>
                    <div onClick={() => submitHandler()} className='create-channel-submit-button'>
                        Create Channel
                    </div>
                </div>
            </div>
        </form>
    );
}

export default CreateChannelForm;