import React from 'react';
import moment from 'moment';
import CountdownTimer from 'react-awesome-countdowntimer'; 

const SimpleComponent = (props) => {
    return (
        <div className="timer">
            <div className="timer-container">
                <div className="countdown-block"></div>
                <CountdownTimer endDate={moment(`${[props.data[0].launch_date_utc]}`)} />
            </div>
        </div>
    );
}
export default SimpleComponent;
