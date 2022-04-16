import './CreateChannelForm.css';
import { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createChannel } from '../../store/servers';

const CreateChannelForm = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams();
    const [name, setName] = useState('');
    const [channelType, setChannelType] = useState('Text');

    const submitHandler = () => {
        dispatch(createChannel({ name, serverId }))
    };

    return (
        <form onSubmit={() => submitHandler()}>
            <div className='create-channel-form-container'>
                <div>
                    <h1>
                        Create {channelType} Channel
                    </h1>
                </div>
                <form onSubmit={() => submitHandler()} id='new-channel-form'>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value.replace(' ', '-'))}
                    />
                </form>
                <div onClick={() => submitHandler()} form='new-channel-form'>Submit</div>
            </div>
        </form>
    );
}

export default CreateChannelForm;