import React, { useContext } from "react"
import linksContainerStyles from "../cssModules/linksContainer.module.css"
import { UserContext } from '../../services/userContext';

import { Link, navigate } from "gatsby"


export default function LinksContainer({ pages }) {
    const userContext = useContext(UserContext);

    return (
        <div style={{
            display: "flex",
            flex: "1",
            justifyContent: "space-between",
            borderBottom: "1px solid #d1c1e0",
        }}>
            {/* <span>{greetingMessage}</span> */}
            <nav className={linksContainerStyles.container}>
                {pages.map((pageName, index) => {
                    const to = index === 0 ? "/" : "/" + pageName.toLowerCase() + "/";
                    return (<Link className={linksContainerStyles.listitem} to={to}>{pageName}</Link>);
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
            </nav>
        </div>
    )
}