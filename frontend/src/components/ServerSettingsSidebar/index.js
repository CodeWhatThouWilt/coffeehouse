import './ServerSettingsSidebar.css';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteServer } from '../../store/servers';
import { Redirect, useHistory } from 'react-router-dom';

const ServerSettingsSidebar = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams();
    const history = useHistory();

    const deleteHandler = async(e) => {
        e.preventDefault();
        dispatch(deleteServer(serverId))
        history.push('/channels');
    };

    return (
        <div className='server-settings-sidebar-container'>
            <nav>
                ServerSettingsSidebar
                <div onClick={e => deleteHandler(e)}>
                    Delete server
                </div>
            </nav>
        </div>
    );
};

export default ServerSettingsSidebar;