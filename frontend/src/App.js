import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navbar from './components/Navbar';
import UserApplication from './components/UserApplication';
import { restoreUser } from './store/session';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';
import { Redirect } from 'react-router-dom';
import SplashPage from './components/SplashPage';
import InviteHandling from './components/InviteHandling';
import { SocketContext } from './context/socket';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const socket = useContext(SocketContext);

  useEffect(() => {
    dispatch(restoreUser())
    .then(res => {
      res.user && socket.emit('user-status', res.user);
    })
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  document.addEventListener('contextmenu', e => e.preventDefault());

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <Route path='/channels/:serverId(\d+)?/:channelId(\d+)?'>
            <UserApplication />
          </Route>

          <Route path='/@me'>
            <UserApplication />
          </Route>

          <Route path={`/inv` + ':invite'}>
            <InviteHandling />
          </Route>

          <Route path="/">
            <SplashPage />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;
