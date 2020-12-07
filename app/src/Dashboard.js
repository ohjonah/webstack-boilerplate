import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { useRepos } from './ReposContext';
import { useHistory } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import DashboardLayout from './layout/DashboardLayout';
import FILTER_ICON from './assets/images/filter_icon_xsm.svg';
import TRASH_EMPTY_ICON from './assets/images/trash-empty.svg';
import TRASH_FULL_ICON from './assets/images/trash-full.svg';
import CHECK_ICON from './assets/images/check.svg';
import CHECK_SQUARE_ICON from './assets/images/check-square.svg';
import SQUARE_ICON from './assets/images/square.svg';
import ARROW_UP_ICON from './assets/images/arrow-up.svg';
import ARROW_DOWN_ICON from './assets/images/arrow-down.svg';

const API_GITHUB = 'https://api.github.com/user/repos';

const DEFAULT_PAGINATION = {
    first: null,
    prev: null,
    next: null,
    last: null,
};

const DEFAULT_PARAMS = {
    type: 'owner',
    sort: 'created',
    direction: 'desc',
};

// interface IFILTER_TYPES {
//     type: 'owner';
//     sort: 'created' || 'updated || 'pushed';
//     direction: 'asc' || 'desc';
// }

const Dashboard = () => {
    const { accessToken } = useAuth();
    const [state, dispatch] = useRepos();
    const history = useHistory();
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState(DEFAULT_PAGINATION);
    const [selectHistory, setSelectHistory] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [params, setParams] = useState(DEFAULT_PARAMS);

    const fetchReposAsync = async (link = API_GITHUB) => {
        setLoading(true);

        // adds filter
        let api = new URL(link);
        for (const [key, val] of Object.entries(params)) {
            api.searchParams.set(key, val);
        }

        // fetches from gh using oauth access token
        const res = await fetch(api.href, {
            headers: {
                Authorization: `token ${accessToken}`,
            },
        });

        // sets pagination navigation from response
        if (res.headers.get('Link')) {
            const paginatedLinks = {
                first: null,
                prev: null,
                next: null,
                last: null,
            };

            res.headers
                .get('Link')
                .replace(/\s/g, '')
                .split(',')
                .forEach((link) => {
                    const links = link.split(';rel=');
                    const url = links[0].slice(1, links[0].length - 1);
                    const place = links[1].slice(1, links[1].length - 1);
                    paginatedLinks[place] = url;
                });

            setPagination(paginatedLinks);
        }

        // flags previously selected repos
        if (res.status >= 200 && res.status <= 299) {
            const data = await res.json();
            data.forEach((repo) => {
                selectHistory[+repo.id]
                    ? (repo.isChecked = true)
                    : (repo.isChecked = false);
            });

            setData(data);
            setLoading(false);
        } else {
            setLoading(false);
            throw Error(`${res.status}, ${res.statusText}`);
        }
    };

    useEffect(() => {
        fetchReposAsync();
    }, [setData, params]);

    const handleCheck = (event) => {
        const { name } = event.currentTarget;
        const newSelectHistory = { ...selectHistory };

        const checked = data.map((repo) => {
            if (repo.id == name) {
                selectHistory[+repo.id]
                    ? delete newSelectHistory[+repo.id]
                    : (newSelectHistory[+repo.id] = repo);

                repo.isChecked = !repo.isChecked;
            }

            return repo;
        });

        setSelectHistory(newSelectHistory);
        setData(checked);
    };

    const handleReview = (event) => {
        const selected = Object.values(selectHistory);
        dispatch({ type: 'SET_REPOS', payload: selected });
        history.push(ROUTES.REVIEW);
    };

    const handlePageTurn = (event) => {
        const { name } = event.currentTarget;
        fetchReposAsync(pagination[name]);
    };

    const handleFilterDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleFilterSelect = async (event) => {
        const { name } = event.currentTarget;
        // if (name === params.direction) return;

        const newParams = { ...params };
        newParams.sort = name;
        newParams.direction = params.direction !== 'asc' ? 'asc' : 'desc';

        // switch (name) {
        //     case 'desc':
        //     case 'asc':
        //         newParams.direction = name;
        //         break;
        //     case 'created':
        //     case 'updated':
        //     case 'pushed':
        //         newParams.sort = name;
        //         break;
        //     case 'reset':
        //         newParams = DEFAULT_PARAMS;
        //         break;
        //     default:
        //         break;
        // }

        setParams(newParams);
    };

    return (
        <DashboardLayout>
            {Object.keys(selectHistory).length > 0 ? (
                <div className="flex justify-between items-center text-center my-4 p-3 rounded bg-yellow-200 border border-yellow-700">
                    <span className="text-yellow-700 text-bold">
                        Review your selections before deleting repos.
                    </span>
                    <button
                        onClick={handleReview}
                        className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Review
                    </button>
                </div>
            ) : (
                <div className="flex justify-between space-between items-center text-center my-4 p-3 rounded bg-blue-200 border border-blue-700">
                    <span className="text-blue-700 text-bold">
                        Select repos you want to delete. Review them before
                        deletion. When you're done, log out!
                    </span>
                </div>
            )}
            <div className="flex flex-row justify-between my-2">
                <div className="relative">
                    <button
                        onClick={handleFilterDropdown}
                        className="flex justify-center items-center px-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded border border-gray-400 focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        <span className="pr-1">{`Sort: ${
                            params.sort.charAt(0).toUpperCase() +
                            params.sort.slice(1)
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
                <div>
                    <button
                        name="prev"
                        onClick={handlePageTurn}
                        className={`mr-2 bg-gray-100 ${
                            pagination.prev ? 'text-gray-800' : 'text-gray-500'
                        } hover:bg-gray-200  px-2 rounded border border-gray-400 focus:outline-none focus:shadow-outline`}
                        disabled={pagination.prev === null}
                    >
                        &lt; Previous
                    </button>
                    <button
                        name="next"
                        onClick={handlePageTurn}
                        className={`mr-2 bg-gray-100 ${
                            pagination.next === pagination.last
                                ? 'text-gray-500'
                                : 'text-gray-800'
                        } hover:bg-gray-200  px-2 rounded border border-gray-400 focus:outline-none focus:shadow-outline`}
                        disabled={pagination.next === pagination.last}
                    >
                        Next &gt;
                    </button>
                </div>
            </div>

            <table className="table w-full text-left">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Select</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Fork</th>
                        <th className="px-4 py-2 cursor-pointer">
                            <a
                                name="created"
                                className="flex flex-row w-full items-center"
                                onClick={handleFilterSelect}
                            >
                                <span className="pr-1">
                                    {params.sort === 'created'
                                        ? '*Created'
                                        : 'Created'}
                                </span>
                                {params.direction === 'asc' &&
                                params.sort === 'created' ? (
                                    <ARROW_UP_ICON />
                                ) : (
                                    <ARROW_DOWN_ICON />
                                )}
                            </a>
                        </th>
                        <th className="px-4 py-2 cursor-pointer">
                            <a
                                name="pushed"
                                className="flex flex-row w-full items-center"
                                onClick={handleFilterSelect}
                            >
                                <span className="pr-1">
                                    {params.sort === 'pushed'
                                        ? '*Committed'
                                        : 'Committed'}
                                </span>
                                {params.direction === 'asc' &&
                                params.sort === 'pushed' ? (
                                    <ARROW_UP_ICON />
                                ) : (
                                    <ARROW_DOWN_ICON />
                                )}
                            </a>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((repo) => (
                        <tr key={repo.id}>
                            <td className="border-t border-b px-4 py-2">
                                <div className="flex justify-center">
                                    <input
                                        type="checkbox"
                                        name={repo.id}
                                        checked={repo.isChecked || false}
                                        onChange={handleCheck}
                                    />
                                </div>
                            </td>
                            <td className="border-t border-b px-4 py-2">
                                {repo.name}
                            </td>
                            <td className="border-t border-b px-4 py-2">
                                {repo.description}
                            </td>
                            <td className="border-t border-b px-4 py-2">{`${repo.fork}`}</td>
                            <td className="border-t border-b px-4 py-2">
                                {new Date(repo.created_at).toLocaleDateString()}
                            </td>
                            <td className="border-t border-b px-4 py-2">
                                {new Date(repo.pushed_at).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </DashboardLayout>
    );
};

export default Dashboard;
