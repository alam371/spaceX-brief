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
            value: "1"
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        });
    }
    

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.value);
       
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
                <h2>Home Page</h2>
                <form action="" onSubmit={this.handleSubmit}>
                    <label htmlFor="launchSelect">Select a Launch</label>
                    <select name="launchSelect" id="" value={this.state.value} onChange={this.handleChange}>
                        {this.state.pastRocketInfo.map((item) => {
                            return (
                                <option value={item.flight_number} key={item.flight_number}> Flight: {item.flight_number}, {item.launch_site.site_name}</option>
                            )
                        })}
                    </select>
                   
                    <Link data={this.state.value} to={`/launchDetails/${this.state.value}`}> <input type="submit" value="Submit" /></Link>
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
                                <p className="homepage__text">Rocket Type: {item.rocket.rocket_name}</p>
                                <p>Flight Number: {item.flight_number}</p>
                                <p>Launch Site:{item.launch_site.site_name_long}</p>
                            </div>
                        )    
                    })}
                </div>
            </div>
        )
    }
}

export default HomePage;