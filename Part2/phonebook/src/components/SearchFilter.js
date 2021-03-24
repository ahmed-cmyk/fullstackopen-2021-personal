import React from 'react';

const SearchFilter = ({ text, handleSearch }) => <div>{text} <input onChange={handleSearch} /></div>

export default SearchFilter