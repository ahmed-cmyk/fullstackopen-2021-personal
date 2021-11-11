import { useState } from 'react'

const useField = (type) => {
  const [ value, setValue ] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const empty = () => {
    setValue('')
  }

  return [{
    type,
    value,
    onChange },
  empty
  ]
}

export default useField