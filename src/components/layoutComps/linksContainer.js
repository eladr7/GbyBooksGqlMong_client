import React, { useContext } from "react"
import linksContainerStyles from "../cssModules/linksContainer.module.css"
import { UserContext } from '../../services/userContext';

import { Link, navigate } from "gatsby"

const CATEGORY_COLORS = [
    'pink-600',
    'green-600',
    'indigo-600',
    'blue-600',
    'yellow-600',
    'red-600',
    'purple-600',
    'teal-600',
    'orange-600',

    'pink-300',
    'green-300',
    'indigo-300',
    'blue-300',
    'yellow-300',
    'red-300',
    'purple-300',
    'teal-300',
    'orange-300',

    'pink-900',
    'green-900',
    'indigo-900',
    'blue-900',
    'yellow-900',
    'red-900',
    'purple-900',
    'teal-900',
    'orange-900'
]

export default function LinksContainer({ pages }) {
    const userContext = useContext(UserContext);

    return (
        <nav className="sidebar-navigation mt-20">
            <h4 className="uppercase text-gray-300">Categories</h4>
            <ul className="list-none pl-0">
                {pages.map((pageName, index) => {
                    const to = index === 0 ? "/" : "/" + pageName.toLowerCase() + "/";
                    return (<li className="mb-3" key={index}>
                        <Link
                            to={to}
                            className="align-bottom"
                            activeClassName="current-page"
                        >
                            <span
                                className={`bg-${CATEGORY_COLORS[index]} rounded-full w-4 h-4 inline-block mr-2`}
                            />
                            {pageName}
                            <span className="text-lg inline-block ml-2 text-gray-300 font-light">
                                (notice that this link is cool)
                            </span>
                        </Link>
                    </li>)
                })}
                <Link className={linksContainerStyles.listitem} to="/app/profile">Profile</Link>
                {` `}
                {userContext.isLoggedIn() ? (
                    <a
                        href="/"
                        onClick={event => {
                            event.preventDefault()
                            userContext.logout(() => navigate(`/app/login`))
                        }}
                    >
                        Logout
                    </a>
                ) : null}
            </ul>
        </nav>
    )
}