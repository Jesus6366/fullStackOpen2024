import React from 'react';

const Filter = ({ searchTerm, handleSearchChange }) => {
    return (
        <div>
            Search: <input value={searchTerm} onChange={handleSearchChange} />
        </div>
    );
};

export default Filter;