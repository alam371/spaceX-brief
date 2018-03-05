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
        return (
            // Home Page Panel
            <div className="homepage">
                <h2 className="spaceX">SpaceX Launch Tracker</h2>
                <div className="panel">
                    {/* <Link to="/home">Home</Link> */}
                    <div className="parallax">
                        <h2 className="home-header"><span className="index">01</span>About SpaceX</h2>
                        <p className="tagline">SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets.</p>
                    </div>
                </div>

                {/* Upcoming Launch Panel */}
                <div className="upcomingLaunch">
                    <div className="panel">
                        <div className="parallax">
                            <h2 className="home-header"><span className="index">02</span>Next Launch</h2>
                            {this.state.upcomingRocketInfo.map((item) => {
                                return (
                                    <div className="launch-stats clearfix left" key={item.flight_number}>
                                        <p>Rocket Type: {item.rocket.rocket_name}</p>
                                        <p className="middle">Flight Number: {item.flight_number}</p>
                                        <p className="right">Launch Site: {item.launch_site.site_name_long}</p>
                                    </div>
                                )
                            })}
                            <div>
                                {this.state.upcomingRocketInfo[0] !== undefined
                                    ? <SimpleComponent data={this.state.upcomingRocketInfo} />
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Select Launch Panel */}
                <div className="select-launch">
                    <div className="panel">
                        <div className="parallax">
                            <h2 className="home-header"><span className="index">03</span>Launch History</h2>
                            <span className="count-up">58 SpaceX Launches To Date</span>
                            <form action="" onSubmit={this.handleSubmit}>
                                <label htmlFor="launchSelect">Select a Launch</label>
                                <select name="launchSelect" id="" value={this.state.value} onChange={this.handleChange}>
                                    {this.state.pastRocketInfo.map((item) => {
                                        return (
                                            <option value={item.flight_number} key={item.flight_number}> Flight: {item.flight_number}, {item.launch_site.site_name}</option>
                                        )
                                    })}
                                </select>

                                <Link className="submit" data={this.state.value} to={`/launchDetails/${this.state.value}`}> <input type="submit" value="Launch Rocket" /></Link>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Multi Launch Map Page */}
                <div className="muli-launch-map panel">
                    <div className="panel">
                        <div className="parallax">
                            <h2 className="home-header"><span className="index">04</span>SpaceX Map</h2>
                            <div className="pin"></div>
                            <div className="pulse"></div>

                            <Link to="/multiLaunchMap">Launches Map</Link>
                        </div>
                    </div>
                </div>


                {/* Jump Menu */}

            </div>
        )
    }
}

export default HomePage;