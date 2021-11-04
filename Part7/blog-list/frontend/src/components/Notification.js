import React from 'react'
import { useSelector } from 'react-redux'

const Alert = () => {
  const notification = useSelector(state => state.notification)
  console.log('notification', notification)
  if (!notification) {
    return null
  }

  return (
    <div className={`notification ${ notification.type === 'error' ? 'error' : 'info' }`}>
      {notification.message}
    </div>
  )
}

export default Alert