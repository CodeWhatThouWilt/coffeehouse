import './UserSettingsMyAccount.css';
import { useState } from 'react';

const UserSettingsMyAccount = ({ sessionUser }) => {
    const [showEmail, setShowEmail] = useState(false);

    const emailHideHandler = () => {
        if (!showEmail) {
            const splitEmail = sessionUser.email.split('@');
            const hiddenChars = '*'.repeat(splitEmail[0].length);
            return hiddenChars + splitEmail[1];
        } else {
            return sessionUser.email;
        };
    };

    return (
        <div className='server-settings-form-container'>
            <div className='server-settings-form-header'>
                <h1>My Account</h1>
            </div>
            <div className='my-account-info-container'>
                <div className='my-account-banner'>
                    <div className='my-account-profile-image-container'>
                        <img src={sessionUser.profilePicture} className='my-account-profile-image' alt='pfp' />
                    </div>
                </div>
                <div className='my-account-user-info'>
                    <div className='my-account-user-info-username'>
                        {sessionUser.username}
                    </div>
                    <button className='my-account-edit-user-profile-button'>
                        Edit User Profile
                    </button>
                </div>
                <div className='my-account-edit-info-container'>
                    <div className='my-account-edit-container'>
                        <div>
                            <div className='input-label'>username</div>
                            <div className='my-account-username'>{sessionUser.username}</div>
                        </div>
                        <button className='my-account-edit-button'>
                            Edit
                        </button>
                    </div>
                    <div className='my-account-edit-container'>
                        <div>
                            <div className='input-label'>email</div>
                            <div className='my-account-username'>
                                {emailHideHandler()}
                                <span onClick={() => setShowEmail(!showEmail)} className='my-account-email-reveal'>{showEmail ? ' Hide' : ' Reveal'}</span>
                            </div>
                        </div>
                        <button className='my-account-edit-button'>
                            Edit
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UserSettingsMyAccount;