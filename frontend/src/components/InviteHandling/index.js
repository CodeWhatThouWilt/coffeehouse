import './InviteHandling.css';
import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import InvalidInvite from '../InvalidInvite';
import { csrfFetch } from '../../store/csrf';
import LoginFormPage from '../LoginFormPage';
import SignupFormPage from '../SignupFormPage';

const InviteHandling = ({ inviteProp }) => {
    const [errorStatus, setErrorStatus] = useState();
    const [forceRender, setForceRender] = useState(false);
    const [form, setForm] = useState();
    const inviteLink = 'inv' + useParams().invite;

    const history = useHistory();

    useEffect(() => {
        const joinServer = async () => {
            try {
                const res = await csrfFetch(`/api/invites/${inviteLink}`, {
                    method: 'POST'
                })
                const isValid = await res.json();
                return history.push(`/channels/${isValid.member.serverId}`);

            } catch (error) {
                if (error.status === 401) {
                    setForm('login')
                } else if (error.status === 404) {
                    setErrorStatus(404);
                    return history.push('/login');
                };
            };
        };
        joinServer();

    }, [inviteLink, history, forceRender])

    return (
        <>
            {form === 'login' &&
                <LoginFormPage inviteLink={inviteLink} setForm={setForm} setForceRender={setForceRender}/>
            }
            {form === 'signup' &&
                <SignupFormPage inviteLink={inviteLink} setForm={setForm} setForceRender={setForceRender}/>
            }
        </>
    );
};

export default InviteHandling;