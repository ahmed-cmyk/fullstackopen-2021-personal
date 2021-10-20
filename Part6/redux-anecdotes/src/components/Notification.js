
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log('notification', notification.length > 12);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  {if(notification.length > 12) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else {
    return <div></div>
  }}
}

export default Notification