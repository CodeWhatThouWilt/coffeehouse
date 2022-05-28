import './LoginForm.css'
import React, { useState, useContext } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, Redirect } from 'react-router-dom';
import background from '../../assets/auth-background.svg';

function LoginFormPage({ inviteLink, setForm, setForceRender }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.sessionState.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser && !inviteLink) return (
    <Redirect to="/channels" />
  );

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(async(res) => {
        if (inviteLink) {
          setForceRender(true);
        } else {
          return history.push('/channels');
        };
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  const demoUserHandler = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login(
      { credential: 'demo@demo.com', password: 'password' }
    ))
      .then(res => {
        return <Redirect to='/channels' />;
      });
  };

  const linkHandler = () => {
    if (inviteLink) {
      return <span onClick={() => setForm('signup')} className='auth-form-link'>Register</span>
    } else {
      return <Link to='/signup' className='auth-form-link'>Register</Link>
    };
  };

  return (
    <div className="auth-background" style={{ backgroundImage: `url(${background})` }}>
      <Link to='/'>
        <div className='auth-home-button'>
          Home
        </div>
      </Link>
      <div className='auth-container'>
        <div className='login-header'>
          <h3>Welcome back!</h3>
          <div>We're so excited to see you again!</div>
        </div>
        <div className='login-form-container'>
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label className='auth-label'>
              Email or username
            </label>
            <input
              type="text"
              value={credential}
              onChange={e => setCredential(e.target.value)}
              required
            />
            <label className='auth-label'>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            <div className='login-bottom-container'>
              <div className='register-text'>Need an account? {linkHandler()}</div>
              <div onClick={e => demoUserHandler(e)} className='demo-user-button'>
                demo user
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
