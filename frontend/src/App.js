import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navbar from './components/Navbar';
import { restoreUser } from './store/session';
import { getUserServers } from './store/servers';
import Sidebar from './components/Sidebar';
import MessagingArea from './components/MessagingArea';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser())
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

          <div className='application-container'>
            <Route path='/channels'>
              <Navbar />
              <Sidebar />
              <Route path='/channels/:serverId/:channelId'>
                {/* TO DO add MessagingArea */}
              </Route>
            </Route>
          </div>

        </Switch>
      )}
    </>
  );
}

export default App;
