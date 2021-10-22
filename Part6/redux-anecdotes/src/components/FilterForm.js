import React from 'react';
import { connect } from 'react-redux';

import { setFilter } from '../reducers/filterReducer';

const FilterForm = (props) => {
    const handleChange = (event) => {
        event.preventDefault()
        const filter = event.target.value
        props.setFilter(filter)
    }
    const style = {
        marginBottom: 10
    }

    return(
        <div style={style}>
            filter
            <input name="filteredContent" onChange={handleChange}/>
        </div>
    )
}

export default connect(
    null,
    { setFilter }
)(FilterForm)