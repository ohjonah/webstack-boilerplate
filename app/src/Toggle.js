import React from 'react';

const Toggle = () => (
    <div className="flex flex-row">
        <button
            name="asc"
            onClick={handleFilterSelect}
            className={`flex justify-center items-center px-2 hover:bg-gray-200 ${
                params.direction === 'asc'
                    ? 'bg-gray-200 border-gray-400 text-gray-800'
                    : 'border-gray-400 text-gray-500'
            } border-r-0 rounded-l border border-gray-400 focus:outline-none focus:shadow-outline`}
        >
            Ascending
        </button>
        <button
            name="desc"
            onClick={handleFilterSelect}
            className={`flex justify-center items-center px-2 hover:bg-gray-200 border ${
                params.direction === 'desc'
                    ? 'bg-gray-200 border-gray-400 text-gray-800'
                    : 'border-gray-400 text-gray-500'
            } rounded-r focus:outline-none focus:shadow-outline`}
        >
            Descending
        </button>
    </div>
);
