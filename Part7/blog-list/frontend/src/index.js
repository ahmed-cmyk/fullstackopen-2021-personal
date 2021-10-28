import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import './index.css'

ReactDOM.render(
    <Provider>
        <App />
    </Provider>, 
    document.getElementById('root')
)