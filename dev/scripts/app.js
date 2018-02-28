import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage'; 
import LaunchDetails from './LaunchDetails'; 
import MultiLaunchMap from './MultiLaunchMap';
import { Link } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <h2>Working</h2>
        <Link to="/Home">Start</Link>
      </div>
    )
  }
}

class App extends React.Component {
    render() {
      return (
        <Router>
          <div>
            <Route path="/" exact component={LandingPage}/>
            <Route path="/Home" exact component={HomePage} />
            <Route path="/LaunchDetails" exact component={LaunchDetails} />
            <Route path="/MultiLaunchMap" exact component={MultiLaunchMap} />
          </div>
        </Router>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
