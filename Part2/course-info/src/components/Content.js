import React from 'react'

const Content = ({ parts }) => {
    let total = parts.reduce((s, p) =>  s + p.exercises, 0)
  
    return (
        <div>
            {parts.map(part => 
                {
                return <p key={part.id}>{part.name} {part.exercises}</p>}
            )}
            <p><b>total of {total} exercises</b></p>
        </div>
    )
}

export default Content;