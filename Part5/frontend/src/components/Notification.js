const Alert = ({ notification }) => {
    if (notification.message === null) {
        return null
    }

    return (
        <div className={`notification ${ notification.type === 'error' ? 'error' : 'info' }`}>
            {notification.message}
        </div>
    )
}

export default Alert