import './EditUsernameModal.css';
import { changeUsername } from '../../store/session';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const EditUsernameModal = ({ sessionUser, setShowUsernameModal }) => {
    const [username, setUsername] = useState(sessionUser.username);
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const submitHandler = e => {
        e.preventDefault();
        setErrors([]);
        const userId = sessionUser.id;
        dispatch(changeUsername({ username: username.trim() , password, userId }))
            .then(() => setShowUsernameModal(false))
            .catch(async res => {
                const data = await res.json();
                data.errors && setErrors(data.errors);
            });
    };

    return (
        <form onSubmit={e => submitHandler(e)}>
            <div className='edit-username-container'>
                <div className='edit-username-top-container'>
                    <div className='edit-username-header'>
                        Change your username
                    </div>
                    <div className='edit-username-subtext'>
                        Enter a new username and your existing password.
                    </div>
                </div>
                <div className='edit-username-mid-container'>
                    <div className='edit-username-input-container'>
                        <label className='input-label'>
                            username
                        </label>
                        <input
                            maxLength={32}
                            type='text'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='edit-username-input-container bottom'>
                        <label className='input-label'>
                            current password
                        </label>
                        <input
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className='edit-username-error-container'>
                    {errors.map(error => (
                        <div className='edit-username-error'>{error}</div>
                    ))}
                </div>
                <div className='create-channel-bottom-container'>
                    <div onClick={() => setShowUsernameModal(false)} className='create-channel-cancel'>
                        Cancel
                    </div>
                    <button className='edit-username-submit-button'>
                        Done
                    </button>
                </div>
            </div>
        </form>
    );
};

export default EditUsernameModal;