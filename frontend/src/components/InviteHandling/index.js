import './InviteHandling.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const InviteHandling = () => {
    const user = useSelector(state => state.sessionState.user.id);
    const inviteLink = 'inv' + useParams().invite;

    useEffect(() => {
        if (user) {
            const joinServer = async() => {
                const res = await fetch(`/api/invites/${inviteLink}`);

            };
        };

    }, [])


    return (
        <div>InviteHandling</div>
    );
};

export default InviteHandling;