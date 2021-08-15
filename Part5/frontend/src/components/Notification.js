import react, { useState } from 'react'

const Alert = ({ notification }) => {
    if (notification === null) {
        return null
    }

    return (
        <div>
            {notification}
        </div>
    )
}

export default Alert