import './DeleteServerModal.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteServer } from '../../store/servers';
import { useHistory } from 'react-router-dom';

const DeleteServerModal = ({ server }) => {
    const [serverName, setServerName] = useState('');
    const [errors, setErrors] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        setErrors([]);
        if (serverName === server.name) {
            dispatch(deleteServer(server.id))
            .then(() => history.push('/channels'));
        } else {
            setErrors("You didn't enter the server name correctly")
        };
    };

    return (
        <form onSubmit={e => submitHandler(e)}>
            <div className='delete-server-container'>
                <div className='delete-server-header'>
                    Delete '{server.name}'
                </div>
                <div className='delete-server-middle'>
                    <div className='delete-server-warning'>
                        Are you sure you want to delete <span className='delete-server-name'>{server.name}</span>?
                        This action cannot be undone.
                    </div>
                    <label>
                        Enter server name
                    </label>
                    <input
                        type='text'
                        value={serverName}
                        onChange={e => setServerName(e.target.value)}
                    />
                    {errors &&
                        <div className='delete-server-error'>
                            {errors}
                        </div>
                    }
                </div>
                <div className='delete-server-bottom'>
                    <div className='delete-server-cancel'>
                        Cancel
                    </div>
                    <button className='delete-server-submit'>
                        Delete Server
                    </button>
                </div>
            </div>
        </form>
    );
};

export default DeleteServerModal;