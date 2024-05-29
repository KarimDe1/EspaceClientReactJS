import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import MasterLayout from './layouts/MasterLayout';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token); // Convert token presence to boolean
  }, []);

  return (
    <div className="App">
      
      <Router>
        <Switch>
          {/* Public route accessible to all users */}
          <Route path="/" exact>
            {isAuthenticated ? <Redirect to="/espaceclient/dashboard" /> : <LoginScreen />}
          </Route>

          {/* Protected route accessible only if user is authenticated */}
          <PrivateRoute path="/espaceclient" component={MasterLayout} isAuthenticated={isAuthenticated} />

          {/* Redirect all other undefined paths to the login screen */}
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </div>
  );
};



// PrivateRoute component for protecting routes based on authentication
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default App;
