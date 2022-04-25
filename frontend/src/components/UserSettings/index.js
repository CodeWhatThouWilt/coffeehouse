import './UserSettings.css';
import UserSettingsSidebar from '../UserSettingsSidebar';
import UserSettingsMyAccount from '../UserSettingsMyAccount';
import CloseSettings from '../CloseSettings';

const UserSettings = ({ sessionUser, setShowModal }) => {

    return (
        <div className='server-settings-container'>
            <UserSettingsSidebar sessionUser={sessionUser}/>
            <UserSettingsMyAccount sessionUser={sessionUser} />
            <CloseSettings setShowModal={setShowModal} />
        </div>
    );
};

export default UserSettings;