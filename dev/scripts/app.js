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
import MyMapComponent from './MyMapComponent';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page">
        <div className="landing-page-text">
          <h2>SpaceX Launch Tracker</h2>
<<<<<<< HEAD
          <Link className="app-button draw" to="/home">Click To Launch</Link> 
=======
          <Link className="app-button draw" to="/home">Click To Launch</Link>
>>>>>>> 812af462f10c7b54b648be5208877f85b246550d
        </div>
      </div>
    )
  }
} 

class App extends React.Component {
<<<<<<< HEAD
    render() {
      return (
        <Router>
          <div className="main-container">
            <Route path="/" exact component={LandingPage}/>
            <Route path="/home" exact component={HomePage} />
            <Route path="/launchDetails/:flight_number/" exact component={LaunchDetails} />
            <Route path="/multiLaunchMap" exact component={MultiLaunchMap} />
          </div>
        </Router>
      )
    }
}
=======
  render() {
    return (
      <Router>
        <div className="main-container">
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" exact component={HomePage} />
          <Route path="/launchDetails/:flight_number/" exact component={LaunchDetails} />
          <Route path="/multiLaunchMap" exact component={MultiLaunchMap} />
        </div>
      </Router>
    )
  }
} 
>>>>>>> 812af462f10c7b54b648be5208877f85b246550d

ReactDOM.render(<App />, document.getElementById('app'));