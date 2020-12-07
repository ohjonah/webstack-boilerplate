import React from 'react';

const Dropdown = () => (
    <div className="relative">
        <button
            onClick={handleFilterDropdown}
            className="flex justify-center items-center px-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded border border-gray-400 focus:outline-none focus:shadow-outline"
            type="button"
        >
            <span className="pr-1">{`Sort: ${
                params.sort.charAt(0).toUpperCase() + params.sort.slice(1)
            }`}</span>
            {/* <FILTER_ICON strokeWidth="2" width="12" height="12" /> */}
        </button>
        {isOpen && (
            <div
                className="absolute mt-2 py-2 w-48 border border-gray-400 bg-gray-100 rounded-lg shadow-md"
                onMouseLeave={handleFilterDropdown}
            >
                <button
                    name="created"
                    onClick={handleFilterSelect}
                    className="flex flex-row w-full items-center px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white cursor-pointer"
                >
                    {params.sort === 'created' ? (
                        <CHECK_SQUARE_ICON />
                    ) : (
                        <SQUARE_ICON />
                    )}
                    <span className="pl-2">Created</span>
                </button>
                <button
                    name="updated"
                    onClick={handleFilterSelect}
                    className="flex flex-row w-full items-center px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white cursor-pointer"
                >
                    {params.sort === 'updated' ? (
                        <CHECK_SQUARE_ICON />
                    ) : (
                        <SQUARE_ICON />
                    )}
                    <span className="pl-2">Updated</span>
                </button>
                <button
                    name="pushed"
                    onClick={handleFilterSelect}
                    className="flex flex-row w-full items-center px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white cursor-pointer"
                >
                    {params.sort === 'pushed' ? (
                        <CHECK_SQUARE_ICON />
                    ) : (
                        <SQUARE_ICON />
                    )}
                    <span className="pl-2">Pushed</span>
                </button>
                <hr className="m-1" />
            </div>
        )}
    </div>
);
