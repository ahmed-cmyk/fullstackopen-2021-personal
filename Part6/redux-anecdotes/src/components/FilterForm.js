import React from 'react';
import { useDispatch } from 'react-redux';

import { setFilter } from '../reducers/filterReducer';

const FilterForm = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        event.preventDefault()
        const filter = event.target.value
        dispatch(setFilter(filter))
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

export default FilterForm