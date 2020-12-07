import React, { useReducer, createContext, useContext } from 'react';

const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_REPOS':
            return {
                ...state,
                repos: action.payload,
            };
        case 'REMOVE_REPO':
            return {
                ...state,
                repos: state.repos.filter((repo) => repo.id !== action.payload),
            };
        case 'DELETE_REPOS':
            console.log('reducer state:', state);
            console.log('state to be deleted:', action.payload);
            // TODO: Can you do async/await in reducer logic?
            return state;
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
