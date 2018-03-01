import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SimpleComponent from './CountdownTimer';

class HomePage extends React.Component {
    constructor () {
        super();
        this.state = {
            rocketInfo: [],
        }
    }

    componentDidMount() {
        axios.get(`https://api.spacexdata.com/v2/launches/upcoming`,{
            params: {
            }
        }).then(({data}) => {
            console.log(data)
            const upcomingLaunchData = data.pop();
            console.log(upcomingLaunchData);
            const rocketData = [];
            rocketData.push(upcomingLaunchData);
            this.setState({
                rocketInfo: rocketData
            })
        })
    }



    render() {
        return(
           <div> 
                <Link to="/Home">Home</Link>
                <Link to="/LaunchDetails">Launch Details</Link>
                <Link to="/MultiLaunchMap">Launches Map</Link>
                <h2>HomePage</h2>
                <form action="">
                    <label htmlFor="launchSelect">Select a Launch</label>
                    <select name="launchSelect" id="">
                        <option value="">Toronto</option>
                        <option value="">New York</option>
                        <option value="">Califonia</option>
                    </select>
                    <input type="submit" name="" id=""/>
                </form>
                <div>
                    <SimpleComponent/>
                </div>
                {this.state.rocketInfo.map((item) => {
                    return (
                        <div key={item.flight_number}>
                            <h2>{item.details}</h2>
                            <p>{item.rocket.rocket_name}</p>
                            <p>{item.flight_number}</p>
                            <p>{item.launch_date_unix}</p>
                            <p>{item.launch_site.site_name_long}</p>
                        </div>
                    )    
                })}
            </div>
        )
    }
}

export default HomePage;