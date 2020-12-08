import React, { useReducer, createContext, useContext } from 'react';

const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_REPOS':
            return {
                ...state,
                repos: action.payload,
            };
        case 'REMOVE_REPO': // Removes it from "to be deleted" array;
            return {
                ...state,
                repos: state.repos.filter((repo) => repo.id !== action.payload),
            };
        case 'DELETE_REPOS':
            return {
                ...state,
                repos: [],
            };
        default:
            return state;
    }
};

const INITIAL_STORE = {
    repos: [],
    error: null,
};

const ReposContext = createContext();

const ReposProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STORE);

    return (
        <ReposContext.Provider value={[state, dispatch]}>
            {children}
        </ReposContext.Provider>
    );
};

const useRepos = () => useContext(ReposContext);

export { ReposProvider, useRepos };
