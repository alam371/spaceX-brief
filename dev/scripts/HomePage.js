import React from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
    render() {
        return(
           <div> 
                <Link to="/LaunchDetails">Launch Details</Link>
                <Link to="/MultiLaunchMap">Launches Map</Link>
                <h2>HomePage</h2>
            </div>
        )
    }
}

export default HomePage;