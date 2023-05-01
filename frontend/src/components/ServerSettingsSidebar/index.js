import './ServerSettingsSidebar.css';
import { useDispatch } from 'react-redux';
import { deleteServer } from '../../store/servers';
import { Redirect, useHistory } from 'react-router-dom';
import { useState } from 'react';
import DeleteServerModal from '../DeleteServerModal';
import { Modal } from '../../context/modal';

const ServerSettingsSidebar = ({ server }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    
    // const deleteHandler = async (e) => {
    //     dispatch(deleteServer(server.id))
    //     history.push('/channels');
    // };

    return (
        <>
            <div className='settings-sidebar-container'>
                <nav className='settings-sidebar-nav'>
                    <div className='settings-sidebar-header'>{server.name}</div>
                    <div className='settings-sidebar-item-active'>
                        Overview
                    </div>
                    <div onClick={() => setShowDeleteModal(true)} className='settings-sidebar-item-inactive'>
                        Delete server
                    </div>
                </nav>
            </div>
            {showDeleteModal &&
                <Modal onclose={() => setShowDeleteModal(false)} >
                    <DeleteServerModal server={server} setShowDeleteModal={setShowDeleteModal} />
                </Modal>
            }
        </>
    );
};

export default ServerSettingsSidebar;