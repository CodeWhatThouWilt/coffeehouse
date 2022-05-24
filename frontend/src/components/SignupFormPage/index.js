import './SignupForm.css';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link,useHistory } from "react-router-dom";
import { signup } from '../../store/session';
import background from '../../assets/auth-background.svg';
import * as sessionActions from '../../store/session';
import { io } from 'socket.io-client';
let socket;


function SignupFormPage({ inviteLink, setForm, setForceRender}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.sessionState.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser && !inviteLink) return (
    <Redirect to="/@me" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(signup({ email: email.trim(), username: username.trim(), password: password.trim() }))
        .then(res => {
          if (inviteLink) {
            socket = io();
            socket.emit('user-status', res.user);
            setForceRender(true);
          } else {
            return history.push('/@me');
          };
        })
        .catch(async (res) => { //if there is an error, then skip the res.ok and get the response
          const data = await res.json(); //parse the data again because we skipped the res.ok
          if (data && data.errors) setErrors(data.errors); //set the new Errors
        });
    };
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const demoUserHandler = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login(
      { credential: 'demo@demo.com', password: 'password' }
    ))
      .then(() => <Redirect to='/channels' />);
  };

  const linkHandler = () => {
    if (inviteLink) {
      return <span onClick={() => setForm('signup')} className='auth-form-link'>Already have an account?</span>
    } else {
      return <Link to='/login' className='auth-form-link'>Already have an account?</Link>
    };
  };

  return (
    <div className='auth-background' style={{ backgroundImage: `url(${background})` }}>
      <Link to='/'>
        <div className='auth-home-button'>
          Home
        </div>
      </Link>
      <div className='auth-container'>
        <h3 className='signup-header'>
          Create an account
        </h3>
        <div className='login-form-container'>
          <form onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label className='auth-label'>
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className='auth-label'>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            <label className='auth-label'>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Sign Up</button>
            <div className='login-bottom-container'>
              <div className='register-text'>{linkHandler()}</div>
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

export default SignupFormPage;
