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
                            <p>Article Link: {item.links.article_link}</p>
                            <p>Video Link: {item.links.video_link}</p>
                            <p>Reddit: </p>
                            <p>Mission Patch: {item.links.mission_patch}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default LaunchDetails;