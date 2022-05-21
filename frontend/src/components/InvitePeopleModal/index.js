import './InvitePeopleModal.css';
import { useState, useEffect, useRef } from 'react';
import { csrfFetch } from '../../store/csrf';

const InvitePeople = ({ server, showInviteModal }) => {
    const [form, setForm] = useState('invite');
    const [inviteUrl, setInviteUrl] = useState('');
    const [maxUses, setMaxUses] = useState(0);
    const [expiration, setExpiration] = useState();
    const [expTimeFrame, setExpTimeFrame] = useState('7 days');
    const [isLoaded, setIsLoaded] = useState(false);
    const [firstChannel, setFirstChannel] = useState();


    useEffect(() => {
        if (!inviteUrl) {

            for (const channel in server.Channels) {
                setFirstChannel(server.Channels[channel]);
                break;
            };

            const serverId = server.id;
            const getLink = async () => {
                const res = await csrfFetch(`/api/servers/${server.id}/invites`, {
                    method: 'POST',
                    body: JSON.stringify({ serverId, maxUses, expiration })
                });
                const inv = await res.json();
                setInviteUrl(domainName() + inv.link);
            };
            getLink();
        }
    }, []);

    function domainName() {
        if (process.env.NODE_ENV === 'production') {
            return 'https://coffeehouse-app.herokuapp.com/';
        } else {
            return 'localhost:3000/';
        };
    };

    const copyHandler = (e) => {
        navigator.clipboard.writeText(inviteUrl);
        e.target.innerHTML = 'Copied';
        e.target.style.backgroundColor = 'rgb(45, 125, 70)';
        setTimeout(() => {
            e.target.innerHTML = 'Copy';
            e.target.style.backgroundColor = 'rgb(88, 101, 242)';
        }, 1000);
    };

    function expirationHandler(timeframe) {
        const date = new Date();
        const space = timeframe.indexOf(' ');
        switch (timeframe) {

            case timeframe === '30 minutes':
                return date.setMinutes(date.getMinutes() + 30);

            case timeframe.endsWith('hours') || timeframe.endsWith('hour'):
                const hours = timeframe.slice(space);
                if (hours !== 1 || hours !== 6 || hours !== 12) return null;
                return date.setHours(date.getHours() + hours);

            case timeframe.endsWith('day') || timeframe.endsWith('days'):
                const days = timeframe.slice(space);
                if (days !== 1 || days !== 7) return null;
                return date.setDate(date.getDate() + days);
        
            default:
                return null;
        };
    };

    return (
        <div className='invite-people'>
            <div className='invite-people-header'>
                <div>Invite friends to {server.name}</div>
                <div className='invite-people-channel'>
                    <i className="fa-solid fa-hashtag  invite-people-hashtag" />
                    <span>{firstChannel?.name}</span>
                </div>
            </div>
            <div className='invite-people-link-section'>
                <div>Send a server invite link to a friend</div>
                <div className='invite-people-link-input-ctn'>
                    <input
                        spellCheck='false'
                        readOnly='true'
                        value={inviteUrl}
                    />
                    <button onClick={e => copyHandler(e)}>Copy</button>
                </div>
                <div className='invite-people-link-footer'>
                    Your invite link expires in {expTimeFrame}. 
                    <span 
                    onClick={() => setForm('link-settings')}
                    className=''
                    > Edit invite link.</span>
                </div>
            </div>
        </div>
    );
};

export default InvitePeople;