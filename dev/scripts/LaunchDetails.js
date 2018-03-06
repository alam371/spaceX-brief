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
                {/* <div className="wrapper"> */}
                    
                    <h2>Launch Details</h2>
                    {this.state.missionInfo.map((item) => {
                        const videoID = item.links.video_link.replace('https://www.youtube.com/watch?v=','')
                        return(
                            <div key={item.flight_number}>
                                <div className="launch_details__box clearfix">
                                    <div className="panel">
                                        <div className="parallax">

                                            {/* Rocket Patch */}
                                            <div className="patch">
                                                <img src={item.links.mission_patch}/>
                                            </div>

                                            <div className="launch-info-container">
                                                {/* Flight Stats */}
                                                <div className="flight-details-text">
                                                    <h4 className="flight-stats">Flight Stats</h4>
                                                    <p>Flight Number : {item.flight_number} </p>
                                                    <p>Rocket Name : {item.rocket.rocket_name}</p>
                                                    <p>Launch Site : {item.launch_site.site_name_long}</p>
                                                    {item.details !== null && item.details !== undefined 
                                                    ? <p>Flight Highlight : {item.details}</p>
                                                    : null
                                                    }
                                                </div>
                                                
                                                {/* Links to Articles */}
                                                <div className="flight-details-links">
                                                    <h4 className="about-this-flight">More About This Flight</h4>
                                                    {item.links.article_link !== null && item.links.article_link !== undefined
                                                        ? <p><a href={item.links.article_link}>Article Link</a></p>
                                                        : null
                                                    }
                                                    {item.links.reddit_launch !== null && item.links.reddit_launch !== undefined
                                                        ? <p><a href={item.links.reddit_launch} target="_blank">Reddit Article</a></p>
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                    <div className="video-container">
                                        <div className="panel">
                                            <div className="parallax">
                                                <iframe 
                                                src={`https://www.youtube.com/embed/${videoID}`} 
                                                frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
                                                </iframe>
                                            </div>    
                                        </div>
                                    </div>
                                </div>
                                <Link to="/home"><i class="far fa-arrow-alt-circle-left"></i></Link>
                            </div>
                        )
                    })}
                {/* </div> */}
            </div>
        )
    }
}

export default LaunchDetails;