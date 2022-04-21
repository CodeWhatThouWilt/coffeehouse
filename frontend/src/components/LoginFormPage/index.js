import './LoginForm.css'
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import background from '../../assets/auth-background.svg';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.sessionState.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/channels" />
  );

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => <Redirect to='/channels' />)
      .catch(async (res) => { //if there is an error, then skip the res.ok and get the response
        const data = await res.json(); //parse the data again because we skipped the res.ok
        if (data && data.errors) setErrors(data.errors); //set the new Errors
      });
  }

  const demoUserHandler = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login(
      { credential: 'demo@demo.com', password: 'password' }
    ))
      .then(() => <Redirect to='/channels' />);
  };

  return (
    <div className="auth-background" style={{ backgroundImage: `url(${background})` }}>
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
          <div className='register-text'>Need an account? <Link to='/signup'>Register</Link></div>
        </form>
        </div>
        <div onClick={e => demoUserHandler(e)} className='demo-user-button'>
          demo user
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
