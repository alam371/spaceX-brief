import React from 'react';
import moment from 'moment';
import CountdownTimer from 'react-awesome-countdowntimer';

const SimpleComponent = (props) => {
    return(
        <div className="timer">
            <CountdownTimer endDate={moment(`${[props.data[0].launch_date_utc]}`) } />
        </div>
    );
}

export default SimpleComponent;
