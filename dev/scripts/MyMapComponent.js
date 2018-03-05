import React from 'react';
import MultiLaunchMap from './MultiLaunchMap';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={3}
        defaultCenter={{ lat: 25.856509, lng: -135.212980 }}
    >
        {props.isMarkerShown && props.selectedLocations.map((item, i) => {
            return (
                <div key={i}>
                    <Marker position={{ lat: item.lat, lng: item.lng }} />
                </div>
            )})
        }
    </GoogleMap>
))

export default MyMapComponent;