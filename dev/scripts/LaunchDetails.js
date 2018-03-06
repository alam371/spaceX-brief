import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class LaunchDetails extends React.Component {
    constructor(){
        super();
        this.state = {
          missionInfo: []
        }
    }

    componentDidMount() {
        axios.get(`https://api.spacexdata.com/v2/launches?flight_number=${this.props.match.params.flight_number}`).then(({ data }) => {
            const launchInfo = data;
            this.setState({
                missionInfo: launchInfo,
            })

        })
    }

    render() {
        return (
            <div className="launch_details__container">
                <div className="wrapper">
                    <Link to="/home">Home</Link>
                    <h2>Launch Details</h2>
                    {this.state.missionInfo.map((item) => {
                        const videoID = item.links.video_link.replace('https://www.youtube.com/watch?v=','')
                        return(
                            <div key={item.flight_number}>
                                <div className="launch_details__box clearfix">
                                    <div className="patch">
                                        <img src={item.links.mission_patch}/>
                                    </div>

                                    <div className="flight-details-text">
                                        <p>Flight: {item.flight_number} </p>
                                        <p>Rocket Name: {item.rocket.rocket_name}</p>
                                        <p>Launch Site: {item.launch_site.site_name_long}</p>
                                        {item.details !== null && item.details !== undefined 
                                        ? <p>Flight Highlight: {item.details}</p>
                                        : null
                                        }
                                    </div>
                                </div>

                                <iframe 
                                src={`https://www.youtube.com/embed/${videoID}`} 
                                frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
                                </iframe>
                                
                                <div className="flight-details-links">
                                    {item.links.article_link !== null && item.links.article_link !== undefined
                                        ? <p>Article Link: <a href={item.links.article_link}>link</a></p>
                                        : null
                                    }
                                    {item.links.reddit_launch !== null && item.links.reddit_launch !== undefined
                                        ? <p>Reddit: <a href={item.links.reddit_launch} target="_blank">link</a></p>
                                        : null
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default LaunchDetails;