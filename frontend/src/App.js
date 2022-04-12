import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navbar from './components/Navbar';
import { restoreUser } from './store/session';
import { getUserServers } from './store/servers';
import Sidebar from './components/Sidebar';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser())
    .then((res) => res && dispatch(getUserServers()))
    .then(() => setIsLoaded(true));
  }, [dispatch]);

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

          <Route path='/channels'>
            <Navbar />
            <Route path=':serverId'>
              <Sidebar />
              <Route path=':channelId'>
                {/* TO DO message component here */}
              </Route>

            </Route>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
