import './SignupForm.css';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signup } from '../../store/session';
import background from '../../assets/auth-background.svg';
import * as sessionActions from '../../store/session';


function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.sessionState.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/@me" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(signup({ email: email.trim(), username: username.trim(), password: password.trim() }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
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
              <div className='register-text'><Link to='/login'>Already have an account?</Link></div>
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
