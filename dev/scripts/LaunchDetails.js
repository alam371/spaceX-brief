import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class LaunchDetails extends React.Component {
    componentDidMount() {
        axios.get(`https://api.spacexdata.com/v2/launches/flight_number=${this.props.match.params.flight_number}`, {
            params: {
                flight_number: `${this.props.match.params.flight_number}`
            }
        }).then((res) => {
            console.log(res);
        })
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <Link to="/home">Home</Link>
                <h2>LaunchDetails</h2>
            </div>
        )
    }
}

export default LaunchDetails;