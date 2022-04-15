import './CreateChannelForm.css';
import { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createChannel } from '../../store/servers';

const CreateChannelForm = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams();
    const [name, setName] = useState('');

    const submitHandler = () => {
        dispatch(createChannel({ name, serverId }))
    };

    return (
        <div className='create-channel-form-container'>
            <form onSubmit={() => submitHandler()} id='new-channel-form'>
                <input
                    value={name}
                    onChange={e => setName(e.target.value.replace(' ', '-'))}
                />
            </form>
            <div onClick={() => submitHandler()} form='new-channel-form'>Submit</div>
        </div>
    );
}

export default CreateChannelForm;