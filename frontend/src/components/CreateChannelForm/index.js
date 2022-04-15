import './CreateChannelForm.css';
import { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';

const CreateChannelForm = () => {
    const { serverId } = useParams();
    const [name, setName] = useState();

    const submitHandler = () => {
        
    };

    return (
        <div className='create-channel-form-container'>
            <input
            value={name}
            onChange={e => setName(e.target.value)}
            />
            <div>Submit</div>
        </div>
    );
};

export default CreateChannelForm;