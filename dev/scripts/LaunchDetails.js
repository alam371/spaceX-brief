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
            // console.log(data);
            const launchInfo = data;
            // console.log(launchInfo);
            this.setState({
                missionInfo: launchInfo,
            })

        })
    }

    render() {
        console.log(this.state.missionInfo);
        return (
            <div>
                <Link to="/home">Home</Link>
                <h2>LaunchDetails</h2>
                {this.state.missionInfo.map((item) => {
                    return(
                        <div key={item.flight_number}>
                            <p>Article Link: <a href={item.links.article_link}>link</a></p>
                            <p>Video Link: {item.links.video_link}</p>
                            <p>Reddit: <a href={item.links.reddit_launch} target="_blank">link</a></p>
                            <div className="patch"><img src={item.links.mission_patch}/></div>
                            {console.log(item.links.reddit_launch)}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default LaunchDetails;