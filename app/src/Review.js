import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRepos } from './ReposContext';
import DashboardLayout from './layout/DashboardLayout';
import * as ROUTES from './constants/routes';
import { useAuth } from './AuthContext';
// import { repos } from './repos';

const Review = () => {
    const history = useHistory();
    const [state, dispatch] = useRepos();
    const [isLoading, setLoading] = useState(false);
    const [hasDeleted, setHasDeleted] = useState(false);
    const { currentUser, accessToken, userAPI, statsAPI } = useAuth();
    const [errors, setErrors] = useState([]);

    const handleDelete = async () => {
        setLoading(true);
        const baseURL = 'https://api.github.com/repos';
        let successes = [];
        let rejects = [];

        await Promise.allSettled(state.repos.map(repo => {
            return fetch(`${baseURL}/${repo.owner.login}/${repo.name}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `token ${accessToken}`,
                },
            });
        }))
        .then(res => {
            successes = res.filter(({ status }) => status === 'fulfilled');
            rejects = res.filter(({ status }) => status === 'rejected');
        });

        // updates user deleted repos count
        statsAPI('deletedReposCount').once('value', (snapshot) => {
            const deletedCount = snapshot.val();
            const successCount = successes.length;
            statsAPI().update({ deletedReposCount: deletedCount + successCount });
        });

        if (rejects.length === 0) {
            dispatch({ type: 'DELETE_REPOS' });
            setHasDeleted(true);
        } else {
            setErrors(rejects);
        }

        setLoading(false);
    };

    const handleRemove = (event) => {
        const { name } = event.target;
        dispatch({ type: 'REMOVE_REPO', payload: +name });
    };

    const handleBackToDashboard = () => {
        history.push(ROUTES.DASHBOARD);
    };

    return (
        <DashboardLayout>
            {state.repos.length ? (
                <>
                    <div className="flex justify-between items-center text-center my-4 p-3 rounded bg-blue-200 border border-blue-700">
                        <span className="text-blue-700 text-bold">
                            Carefully review the repos you selected. You sure
                            you want to delete them? Delete button is at the
                            bottom of this page.
                        </span>
                    </div>

                    <table className="table w-full text-left">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Fork</th>
                                <th className="px-4 py-2">Created</th>
                                <th className="px-4 py-2">Committed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.repos.map((repo) => (
                                <tr key={repo.id}>
                                    <td className="border-t border-b px-4 py-2">
                                        {repo.name}
                                    </td>
                                    <td className="border-t border-b px-4 py-2">
                                        {repo.description}
                                    </td>
                                    <td className="border-t border-b px-4 py-2">{`${repo.fork}`}</td>
                                    <td className="border-t border-b px-4 py-2">
                                        {new Date(
                                            repo.created_at
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="border-t border-b px-4 py-2">
                                        {new Date(
                                            repo.pushed_at
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="border-t border-b px-4 py-2">
                                        <div className="flex justify-center">
                                            <button
                                                name={repo.id}
                                                onClick={handleRemove}
                                                className="bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-1 rounded focus:outline-none focus:shadow-outline"
                                                type="button"
                                            >
                                                Keep
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        onClick={handleDelete}
                        className="block w-48 mx-auto bg-red-600 hover:bg-red-500 text-white my-8 p-2 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Deleting...' : 'Delete My Repos'}
                    </button>
                </>
            ) : (
                    <div className="flex justify-between items-center text-center my-4 p-3 rounded bg-blue-200 border border-blue-700">
                        {hasDeleted ?
                            <span className="text-blue-700 text-bold">
                                Repos have been deleted.
                            </span>
                            : <span className="text-blue-700 text-bold">
                                No repos have been selected to be deleted.
                            </span>
                        }
                        <button
                            onClick={handleBackToDashboard}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Back to Select Repos
                    </button>
                    </div>
                )}
        </DashboardLayout>
    );
};

export default Review;
