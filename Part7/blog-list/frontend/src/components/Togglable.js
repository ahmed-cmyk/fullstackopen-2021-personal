import React, { useImperativeHandle, useState } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <span className="border-2 border-solid border-blue-400 rounded-md p-1 bg-blue-300 text-white my-2">
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </span>
      </div>
      <div style={showWhenVisible} className={props.class}>
        {props.children}
        <span className="border-2 border-solid border-red-400 rounded-md p-1 bg-red-300 text-white my-2">
          <button onClick={toggleVisibility}>{props.hideButtonLabel}</button>
        </span>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable