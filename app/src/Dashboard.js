import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const Dashboard = () => {
    const { currentUser, accessToken, authState, logout } = useAuth();
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const fetchReposAsync = async (
        link = 'https://api.github.com/user/repos?page=1'
    ) => {
        setLoading(true);
        const res = await fetch(link, {
            headers: {
                Authorization: `token ${accessToken}`,
            },
        });

        if (res.headers.get('Link')) {
            const paginatedLinks = {};

            res.headers
                .get('Link')
                .split(',')
                .forEach((link) => {
                    const links = link.split('; rel=');
                    const url = links[0].slice(1, links[0].length - 1);
                    const place = links[1].slice(1, links[1].length - 1);
                    paginatedLinks[place] = url;
                });

            setPagination(paginatedLinks);
        }

        if (res.status >= 200 && res.status <= 299) {
            const data = await res.json();
            data.forEach((repo) => (repo.isChecked = false));

            setData(data);
            setLoading(false);
        } else {
            setLoading(false);
            throw Error(`${res.status}, ${res.statusText}`);
        }
    };

    useEffect(() => {
        fetchReposAsync();
    }, []);

    const handleCheck = (event) => {
        const { name } = event.target;

        const checked = data.map((repo) => {
            if (repo.id == name) repo.isChecked = !repo.isChecked;
            return repo;
        });

        setData(checked);
    };

    const handleReview = (event) => {
        const review = data.filter((repo) => repo.isChecked === true);
        console.log('review:', review);
    };

    const handleLogout = () => {
        logout();
    };

    const handlePageTurn = (event) => {
        const { name } = event.target;
        fetchReposAsync(pagination[name]);
    };

    const handleFilter = () => {
        console.log('handling filter');
    };

    return (
        <div className="flex flex-col items-center h-screen">
            <div className="container max-w-screen-lg">
                <div className="flex flex-row justify-between mt-4 px-4 lg:px-0">
                    <h1 className="text-2xl font-bold">
                        {authState.isLoading
                            ? 'Loading up your profile!'
                            : `Hi, ${currentUser.displayName}!`}
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-green-500 text-white px-2 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        {authState.isLoading ? 'Loading' : 'Log Out'}
                    </button>
                </div>

                <div className="my-8 flex flex-row justify-between">
                    <button
                        onClick={handleFilter}
                        className="bg-blue-500 hover:bg-green-500 text-white font-bold px-2 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Filter by
                    </button>
                    <div>
                        {pagination && pagination.prev && (
                            <button
                                name="prev"
                                onClick={handlePageTurn}
                                className="mr-2 bg-blue-600 hover:bg-blue-400 text-white font-bold px-2 rounded focus:outline-none focus:shadow-outline"
                            >
                                &lt; Previous
                            </button>
                        )}
                        {pagination && pagination.next && (
                            <button
                                name="next"
                                onClick={handlePageTurn}
                                className="bg-blue-600 hover:bg-blue-400 text-white font-bold px-2 rounded focus:outline-none focus:shadow-outline"
                            >
                                Next &gt;
                            </button>
                        )}
                    </div>
                </div>

                {data.filter((repo) => repo.isChecked === true).length > 0 && (
                    <div className="flex justify-end">
                        <button
                            onClick={handleReview}
                            className="bg-blue-500 hover:bg-green-500 text-white font-bold px-2 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Review
                        </button>
                    </div>
                )}

                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Select</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Fork</th>
                                <th className="px-4 py-2">Last Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((repo) => (
                                <tr key={repo.id}>
                                    <td className="border px-4 py-2">
                                        <div className="flex justify-center">
                                            <input
                                                type="checkbox"
                                                name={repo.id}
                                                checked={
                                                    repo.isChecked || false
                                                }
                                                onChange={handleCheck}
                                            />
                                        </div>
                                    </td>
                                    <td className="border px-4 py-2">
                                        {repo.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {repo.description}
                                    </td>
                                    <td className="border px-4 py-2">{`${repo.fork}`}</td>
                                    <td className="border px-4 py-2">
                                        {repo.updated_at}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Footer />
        </div>
    );
};

const Footer = () => (
    <div className="py-8">
        <p className="font-bold text-sm">
            Made with React and TailwindCSS using the Github API
        </p>
    </div>
);

export default Dashboard;
