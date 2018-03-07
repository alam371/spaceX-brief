import React from 'react';
import axios from 'axios';
import Qs from 'qs';
import moment from 'moment';
import { Link } from 'react-router-dom';
import MyMapComponent from './MyMapComponent';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

// API Keys:
// Joey's Key: AIzaSyBoOK_LZFkhKIDq2Ihzl1wBdD0Eo9gC-ag
// Joey's Second Key: AIzaSyBnIIYzqfH24TR2iFHpPVmhP9Z9GSO3FIU
// Angeline's Key: AIzaSyDHH-sUXf3qfy-eySEqhbkLd38Zpw4G0Jw
// Angeline's Second Key: AIzaSyBLOA1LmeuBR4_8PiWQ1Y1OOlI4G1yAdGg
// Quinn's Key: AIzaSyDt8WM7sOF8k5AYaAVfsGyLeHF8AiilnQs

class MultiLaunchMap extends React.Component {
    constructor() {
        super();
        this.state = {
            mapInfo: [],
            startDate: 1,
            endDate: 1,
            userSelectMap: [],
            userSelectLocations: [],
            generatedUserMap: false,
        }
        this.getStartDate = this.getStartDate.bind(this);
        this.getEndDate = this.getEndDate.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(`https://api.spacexdata.com/v2/launches/`)
            .then(({ data }) => {
                const allRocketData = data;
                this.setState({
                    mapInfo: allRocketData,
                })
            });
    }

    formSubmit(e) {
        e.preventDefault();
        this.state.startDate > this.state.endDate ? alert('Incorrect submission of date. Please check your selection again.') : null;
        const slicedMapInfo = this.state.mapInfo.slice(this.state.startDate - 1, this.state.endDate);
        this.setState({
            userSelectMap: slicedMapInfo
        });
        console.log(slicedMapInfo);
        const userSelect = slicedMapInfo.map((item) => {
            return this.getGeoCoords(item.launch_site.site_name_long)
        });
        Promise.all(userSelect).then((data) => {
            this.setState({
                userSelectLocations: data.map((item) => {
                    return item.data.results[0].geometry.location
                }),
                generatedUserMap: true,
            })
        })
    }

    getGeoCoords(longName) {
        return axios({
            method: 'GET',
            url: 'https://proxy.hackeryou.com',
            dataResponse: 'json',
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            params: {
                reqUrl: 'https://maps.googleapis.com/maps/api/place/textsearch/json',
                params: {
                    key: "AIzaSyBnIIYzqfH24TR2iFHpPVmhP9Z9GSO3FIU",
                    query: longName,
                }
            }
        })
    }

    getStartDate(e) {
        this.setState({
            startDate: Number(e.target.value)
        })
    }

    getEndDate(e) {
        this.setState({
            endDate: Number(e.target.value)
        })
    }

    render() {
        return (
            <section>
                <div className="multi-launch-section">
                    <div className="wrapper">
                        <h2>SpaceX Launch Map</h2>
                        <h3>Select a Date Range to View Launches</h3>
                        <div className="multi-launch-form">
                            <form action="" onSubmit={this.formSubmit}>
                                <label htmlFor="startDate">From</label>
                                <select name="startDate" id="" onChange={this.getStartDate} value={this.state.startDate}>
                                    {this.state.mapInfo.map((item) => {
                                        return (
                                            <option value={item.flight_number} key={item.flight_number}>Flight: {item.flight_number}, {moment(`${item.launch_date_utc}`).format('LL')}</option>
                                        )
                                    })}
                                </select>
                                <label htmlFor="endDate">To</label>
                                <select name="endDate" id="" onChange={this.getEndDate} value={this.state.endDate}>
                                    {this.state.mapInfo.map((item) => {
                                        return (
                                            <option value={item.flight_number} key={item.flight_number}>Flight: {item.flight_number}, {moment(`${item.launch_date_utc}`).format('LL')}</option>
                                        )
                                    })}
                                </select>
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
                    <Link to="/home"><i className="far fa-arrow-alt-circle-left"></i></Link>
                </div>
                <div className="multi-launch-generated-map">
                    <div className="wrapper">
                        {this.state.generatedUserMap
                            ? <MyMapComponent
                                isMarkerShown
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDhAn79jm9LKEu4VsePWqln4WpmC_gEmgw&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                selectedLocations={this.state.userSelectLocations}
                            />
                            : null}
                    </div>
                </div>
            </section>
        )
    }
}

export default MultiLaunchMap;