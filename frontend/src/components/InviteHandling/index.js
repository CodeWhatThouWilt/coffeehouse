import './InviteHandling.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams, Redirect, useHistory } from 'react-router-dom';
import InvalidInvite from '../InvalidInvite';
import { csrfFetch } from '../../store/csrf';

const InviteHandling = () => {
    const user = useSelector(state => state.sessionState.user.id);
    const inviteLink = 'inv' + useParams().invite;
    const history = useHistory();

    useEffect(() => {
        if (user) {
            const joinServer = async() => {
                try {
                    const res = await csrfFetch(`/api/invites/${inviteLink}`, {
                        method: 'POST',
                        body: JSON.stringify({ user })
                    })
                    const isValid = await res.json();
                    return history.push(`/${isValid.member.serverId}`);
                    
                } catch (error) {
                    
                }
            };
            joinServer();
        };

    }, [])


    return (
        <div>InviteHandling</div>
    );
};

export default InviteHandling;