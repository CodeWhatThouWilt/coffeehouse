import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import Navigation from './components/Navigation';
import SignupFormPage from './components/SignupFormPage';
import { restoreUser } from './store/session';
import { getUserServers } from './store/servers';

import ServerSidebar from './components/ServerSidebar';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser())
    .then(() => getUserServers())
    .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/'>
            <ServerSidebar />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
