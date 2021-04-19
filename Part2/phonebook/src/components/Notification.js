import React from 'react';

import '../styles/Notification.css'

const Notification = ({ message, errorStatus }) => {
    if(message === null) {
        return null
    }

    return(
        <div className={errorStatus ? 'error' : 'alert'}>
            {message}
        </div>
    )
}

export default Notification;