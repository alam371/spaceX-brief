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
           <section className="homepage">
                <div className="wrapper">
                <h2 className="homepage-title">SpaceX Launch Tracker</h2>

                        <div className="parallax">

                            <h2 className="home-header"><span className="index">01</span>About SpaceX</h2>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 150" x="0px" y="0px"><title>Launch</title><path d="M72.1,23.93A75.3,75.3,0,0,0,61.72,11.57L60,10l-1.72,1.57A75.3,75.3,0,0,0,47.9,23.93L47.2,25H72.8Z" /><path d="M49.64,96.16a72.63,72.63,0,0,0,8.89,12.28L60,110l1.47-1.56a72.66,72.66,0,0,0,8.89-12.28L72.5,92.5h-25Z" /><path d="M30,74.48V95l11.56-9.63C38,78.26,35.73,69,35.15,59.09A25.57,25.57,0,0,0,30,74.48Z" /><path d="M84.85,59.09C84.27,69,82,78.26,78.44,85.37L90,95V74.48A25.57,25.57,0,0,0,84.85,59.09Z" /><path d="M74.37,27.5H45.63c-5.33,8.92-8.13,18-8.13,26.55C37.5,67.9,40.9,81,46.59,89l.74,1H72.67l.74-1c5.69-8,9.09-21,9.09-34.9C82.5,45.53,79.7,36.42,74.37,27.5ZM60,57.5a10,10,0,1,1,10-10A10,10,0,0,1,60,57.5Z" /></svg>

                            <p className="tagline">SpaceX designs, manufactures and launches advanced rockets and spacecraft. The company was founded in 2002 to revolutionize space technology, with the ultimate goal of enabling people to live on other planets.</p>

                            <span className="quotable"> - SpaceX.com </span>

                        </div> 

                        {/* Upcoming Launch Panel */}
                        <div className="upcomingLaunch">
                            <div className="parallax">
                                <h2 className="home-header"><span className="index">02</span>Next Launch</h2>
                                {/* Rocket Icon */}
                                {this.state.upcomingRocketInfo.map((item) => {
                                    return (
                                        <div className="launch-stats clearfix" key={item.flight_number}>
                                            <p>Rocket Type: <span className="dynamic-text">{item.rocket.rocket_name}</span></p>
                                            <p>Flight     <span className="dynamic-text">#{item.flight_number}</span></p>
                                            <p>Launch Site: <span className="dynamic-text">{item.launch_site.site_name_long}</span></p>
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

                        {/* Select Launch Panel */}
                        <div className="select-launch">
                            <div className="parallax launch-form">
                                <h2 className="home-header"><span className="index">03</span>Launch History</h2>
                                <span className="count-up"><span>58</span> SpaceX Launches To Date</span>
                                <p className="select-text">Select from the options below for more information about each SpaceX launch.</p>

                                <div className="form-button">
                                    <form action="" onSubmit={this.handleSubmit}>
                                        <label htmlFor="launchSelect"></label>
                                        <select name="launchSelect" id="" value={this.state.value} onChange={this.handleChange}>
                                            {this.state.pastRocketInfo.map((item) => {
                                                return (
                                                    <option value={item.flight_number} key={item.flight_number}> Flight: {item.flight_number}, {item.launch_site.site_name}</option>
                                                )
                                            })}
                                        </select>

                                    <Link className="home-page-button line-draw" data={this.state.value} to={`/launchDetails/${this.state.value}`}> <input type="submit" value="Launch Rocket" /></Link>
                                    </form>
                                </div>

                               

                            </div>
                        </div>
                        
                        {/* Multi Launch Map Panel */}
                        <div className="multi-launch-map panel">
                        <div className="parallax goMap">
                                <h2 className="home-header"><span className="index">04</span>Map of Past Launches</h2>
                               

                            <div className="us-map">
                                <img src="../../public/assets/us-map.png" alt="" />
                                <div className="pin"></div>
                                <div className="pulse"></div>
                            </div>

                            <Link className="home-page-button line-draw" to="/multiLaunchMap">Go To Map</Link>
                            </div>
                        </div>

                    </div>
                </section>

        )
    }
}

export default HomePage;