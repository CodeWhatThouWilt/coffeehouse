import './CreateChannelForm.css';
import { useState } from 'react';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createChannel } from '../../store/channels';
import unfilledRadio from '../../assets/unfilledRadio.svg';
import filledRadio from '../../assets/filledInRadio.svg';

const CreateChannelForm = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { serverId } = useParams();
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);

    const submitHandler = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(createChannel({ name, serverId }))
        .then(res => history.push(`/${res.serverId}/${res.id}`))
        .then(() => setShowModal(false))
        .catch(async res => {
            const data = await res.json();
            data.errors && setErrors(data.errors);
        });
    };

    const inputHandler = (e) => {
        const input = e.target.value;
        const removeSpaces = input.replace(' ', '-');
        const removeSymbols = removeSpaces.replace(/[^a-zA-Z0-9-]/, '');
        const removeRepeatDash = removeSymbols.replace(/-{2,}?/,'-');
        setName(removeRepeatDash.toLowerCase());
    };

    return (
        <form onSubmit={e => submitHandler(e)}>
            <div className='create-channel-container'>
                <div className='create-channel-top-text'>
                    <h1>
                        Create Text Channel
                    </h1>
                </div>
                <div className='create-channel-mid-section-container'>
                    <div className='create-channel-channel-name-header'>
                        CHANNEL NAME {name.length > 100 && <div className='create-channel-text-counter'>({name.length} / 100)</div>}
                    </div>
                    <div className='create-channel-input-container'>
                        <i className="fa-solid fa-hashtag hashtag-icon" />
                        <input
                            value={name}
                            placeholder='new-channel'
                            onChange={e => inputHandler(e)}
                            maxLength={100}
                            minLength={1}
                            required
                        />
                    </div>
                    <div className='create-channel-error-container'>
                        {errors.map(error => (
                            <div className='create-channel-error'>{error}</div>
                        ))}
                    </div>
                </div>
                <div className='create-channel-bottom-container'>
                    <div onClick={() => setShowModal(false)} className='create-channel-cancel'>
                        Cancel
                    </div>
                    <div onClick={e => submitHandler(e)} className='create-channel-submit-button' >
                        Create Channel
                    </div>
                </div>
            </div>
        </form>
    );
}

export default CreateChannelForm;