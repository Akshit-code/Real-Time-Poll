import React , { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import CreatePoll from './pages/CreatePoll';
import VotePoll from './pages/VotePoll';
import PollResults from './pages/PollResults';
import Signup from './pages/Signup';
import Login from './pages/Login';
import HomePage from "./pages/HomePage";
import { AuthContext } from './context/AuthContext';

import './styles/global.css';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/create" component={CreatePoll} isAuthenticated={!!user} />
        <PrivateRoute path="/vote/:pollId" component={VotePoll} isAuthenticated={!!user} />
        <PrivateRoute path="/results/:pollId" component={PollResults} isAuthenticated={!!user} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </Router>
  );
}

// Protected Route Component
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default App;
