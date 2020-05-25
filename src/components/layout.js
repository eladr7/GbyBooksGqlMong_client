import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../services/auth"
import { rhythm } from "../utils/typography"

// const ListLink = props => (
//     <li style={{ display: `inline-block`, marginRight: `1rem` }}>
//         <Link to={props.to}>{props.children}</Link>
//     </li>
// )

export default function Layout({ children }) {
    const data = useStaticQuery(
        graphql`
          query {
            site {
              siteMetadata {
                title
              }
            }
          }
        `
    )

    let greetingMessage = ""
    if (isLoggedIn()) {
        greetingMessage = `Hello ${getUser().name}`
    } else {
        greetingMessage = "You are not logged in"
    }
    return (
        <div css={css`
            margin: 0 auto;
            max-width: 700px;
            padding: ${rhythm(2)};
            padding-top: ${rhythm(1.5)};
            `}
        >
            <span>{greetingMessage}</span>
            {/* <ListLink to="/">Home</ListLink> */}
            <nav>
                <Link to={`/`}>
                    <h3 css={css`
                        margin-bottom: ${rhythm(2)};
                        display: inline-block;
                        font-style: normal;`}
                    >
                        {data.site.siteMetadata.title}
                    </h3>
                </Link>
                {' '}
                <Link to="/app/profile">Profile</Link>
                {' '}
                {isLoggedIn() ? (
                    <a
                        href="/"
                        onClick={event => {
                            event.preventDefault()
                            logout(() => navigate(`/app/login`))
                        }}
                    >
                        Logout
                    </a>
                ) : null}
                {' '}
                <Link
                    to={`/about/`}
                    css={css`float: right;`}
                >
                    About
                </Link>
                {' '}
                <Link
                    to={`/my-files/`}
                    css={css`float: right; margin-right: 5%;`}
                >
                    my-files
                </Link>
            </nav>
            {children}
        </div>
    )
}
