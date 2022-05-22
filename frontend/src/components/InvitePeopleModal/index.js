import './InvitePeopleModal.css';
import { useState, useEffect, useRef } from 'react';
import { csrfFetch } from '../../store/csrf';

const InvitePeople = ({ server, setShowInviteModal }) => {
    const [form, setForm] = useState('invite');
    const [inviteUrl, setInviteUrl] = useState('');
    const [maxUses, setMaxUses] = useState(0);
    const [expTimeFrame, setExpTimeFrame] = useState('7 days');
    // const [isLoaded, setIsLoaded] = useState(false);
    const [firstChannel, setFirstChannel] = useState();

    const getLink = async () => {
        const expiration = expirationHandler(expTimeFrame);
        const res = await csrfFetch(`/api/servers/${server.id}/invites`, {
            method: 'POST',
            body: JSON.stringify({ serverId: server.id, maxUses, expiration })
        });
        const inv = await res.json();
        setInviteUrl(domainName() + inv.link);
    };

    useEffect(() => {
        if (!inviteUrl) {
            for (const channel in server.Channels) {
                setFirstChannel(server.Channels[channel]);
                break;
            };
            getLink('7 days');
        };
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

    function expirationHandler(timeFrame) {
        const date = new Date();
        const space = timeFrame.indexOf(' ');
        if (timeFrame === '30 minutes') {
            date.setMinutes(date.getMinutes() + 30);
            console.log(date);
            return date;

        } else if (timeFrame.endsWith('hour') || timeFrame.endsWith('hours')) {
            const hoursStr = timeFrame.slice(0, space);
            const hours = parseInt(hoursStr, 10);
            if (hours !== 1 && hours !== 6 && hours !== 12) return undefined;
            date.setHours(date.getHours() + hours);
            return date;

        } else if (timeFrame.endsWith('day') || timeFrame.endsWith('days')) {
            const daysStr = timeFrame.slice(0, space);
            const days = parseInt(daysStr, 10);
            if (days !== 1 && days !== 7) return undefined;
            date.setDate(date.getDate() + days);
            return date;

        } else {
            return undefined;
        };
    };

    const newLinkHandler = () => {
        getLink()
            .then(() => setForm('invite'));
        console.log(inviteUrl);
    };

    return (
        <>
            {form === 'invite' &&
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
                                spellCheck={false}
                                readOnly={true}
                                value={inviteUrl}
                            />
                            <button onClick={e => copyHandler(e)}>Copy</button>
                        </div>
                        <div className='invite-people-link-footer'>
                            Your invite link expires in {expTimeFrame}.&nbsp;
                            <span
                                onClick={() => setForm('link-settings')}
                                className=''
                            >Edit invite link.</span>
                        </div>
                    </div>
                </div>
            }
            {form === 'link-settings' &&
                <div className='invite-people'>
                    <div className='invite-people-header'>
                        <div>Server invite link settings</div>
                    </div>
                    <div className='invite-people-link-section'>
                        <div>
                            <div>Expire after</div>
                            <select
                            id='expire'
                                value={expTimeFrame}
                                onChange={e => setExpTimeFrame(e.target.value)}
                            >
                                    <option for='expire' value='30 minutes'>30 minutes</option>
                                    <option value='1 hour'>1 hour</option>
                                    <option value='6 hours'>6 hours</option>
                                    <option value='12 hours'>12 hours</option>
                                    <option value='1 day'>1 day</option>
                                    <option value='7 days'>7 days</option>
                                    <option value={undefined}>Never</option>
                            </select>
                        </div>
                        <div>
                            <div>Max number of uses</div>
                            <select
                                id='max-uses'
                                value={maxUses}
                                onChange={e => setMaxUses(e.target.value)}
                            >
                                <option for='max-uses' value={0}>No limit</option>
                                <option value={1}>1 use</option>
                                <option value={5}>5 uses</option>
                                <option value={10}>10 uses</option>
                                <option value={25}>25 uses</option>
                                <option value={50}>50 uses</option>
                                <option value={100}>100 uses</option>
                            </select>
                        </div>
                    </div>
                    <div className='create-channel-bottom-container'>
                        <div onClick={() => setShowInviteModal(false)} className='create-channel-cancel'>
                            Cancel
                        </div>
                        <button onClick={() => newLinkHandler()} className='invite-people-submit-button' >
                            Generate a New Link
                        </button>
                    </div>
                </div>

            }
        </>
    );
};

export default InvitePeople;