import './InvitePeopleModal.css';
import { useState, useEffect } from 'react';
import { csrfFetch } from '../../store/csrf';

const InvitePeople = ({ server, showInviteModal }) => {
    const [form, setForm] = useState('invite');
    const [inviteUrl, setInviteUrl] = useState();
    const [maxUses, setMaxUses] = useState('U');
    const [expiration, setExpiration] = useState('N');
    const [isLoaded, setIsLoaded] = useState(false);
    let firstChannel;
    
    for (const channel in server.Channels) {
        firstChannel = channel;
        break;
    };

    useEffect(() => {
        const serverId = server.id;
        const getLink = async() => {
            const res = await csrfFetch(`/api/servers/${server.id}/invites`, {
                method: 'POST',
                body: JSON.stringify({ serverId, maxUses,})
            });
        };
        
    },[form]);

    function domainName() {
        if (process.env.NODE_ENV !== 'production') {
            return 'https://coffeehouse-app.herokuapp.com/';
        } else {
            return 'localhost:3000/';
        };
    };

    return (
        <div className='invite-people'>
            <div className='invite-people-header'>
                <div>Invite friends to {server.name}</div>
                <div className='invite-people-channel'>
                    <i className="fa-solid fa-hashtag  invite-people-hashtag" />
                    <span>{firstChannel.name}</span>
                </div>
            </div>
            <div className='invite-people-link-section'>
                <div>Send a server invite link to a friend</div>
            </div>
        </div>
    );
};

export default InvitePeople;