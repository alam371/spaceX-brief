import React from 'react';
import moment from 'moment';
import CountdownTimer from 'react-awesome-countdowntimer';

const SimpleComponent = () => {
    return(
        <div className="timer">
            <CountdownTimer endDate={moment('2018-03-29T00:00:00-08:00') } />
        </div>
    );
}

export default SimpleComponent;
