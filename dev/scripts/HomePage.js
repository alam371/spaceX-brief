import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SimpleComponent from './CountdownTimer';

class HomePage extends React.Component {
    constructor () {
        super();
        this.state = {
            upcomingRocketInfo: [],
            pastRocketInfo: [],
        }
    }

    componentDidMount() {
        axios.get(`https://api.spacexdata.com/v2/launches/upcoming`)
            .then(({data}) => {
            const upcomingLaunchData = data.pop();
            const rocketData = [];
            rocketData.push(upcomingLaunchData);
            this.setState({
                upcomingRocketInfo: rocketData,
            })
        })

        axios.get(`https://api.spacexdata.com/v2/launches/`)
        .then(({data}) => {
            const pastRocketData = data;
            this.setState({
                pastRocketInfo: pastRocketData,
            })
        }) 
    }

    render() {
        return(
           <div> 
                <Link to="/home">Home</Link>
                <Link to="/multiLaunchMap">Launches Map</Link>
                <h2>HomePage</h2>
                <form action="">
                    <label htmlFor="launchSelect">Select a Launch</label>
                    <select name="launchSelect" id="">
                        {this.state.pastRocketInfo.map((item) => {
                            return (
                                <option value="" key={item.flight_number}> Flight: {item.flight_number},{item.launch_site.site_name_long}</option>
                            )
                        })}
                    </select>
                    <input type="submit" name="" id=""/>
                </form>
                <div className="upcomingLaunch">
                    <div>
                        {this.state.upcomingRocketInfo[0] !== undefined 
                        ? <SimpleComponent data={this.state.upcomingRocketInfo} /> 
                        : null}
                    </div>
                    {this.state.upcomingRocketInfo.map((item) => {
                        return (
                            <div key={item.flight_number}>
                                <h2>Next Launch</h2>
                                <p>Rocket Type: {item.rocket.rocket_name}</p>
                                <p>Flight Number: {item.flight_number}</p>
                                <p>Launch Site:{item.launch_site.site_name_long}</p>
                                {/* <Link to={`/launchDetails/${item.flight_number}`}>Details</Link> */}
                            </div>
                        )    
                    })}
                </div>
            </div>
        )
    }
}

export default HomePage;