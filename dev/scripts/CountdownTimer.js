import React from 'react';
import moment from 'moment';
import CountdownTimer from 'react-awesome-countdowntimer'; 

const SimpleComponent = (props) => {
    return (
        <div className="timer">
            <div className="timer-container">
                <div className="countdown-block"></div>
<<<<<<< HEAD
                <CountdownTimer endDate={moment(`${[props.data[0].launch_date_utc]}`) } />
=======
                <CountdownTimer endDate={moment(`${[props.data[0].launch_date_utc]}`)} />
>>>>>>> 812af462f10c7b54b648be5208877f85b246550d
            </div>
        </div>
    );
}
export default SimpleComponent;
