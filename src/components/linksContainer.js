import React from "react"
import linksContainerStyles from "./linksContainer.module.css"
import { Link } from "gatsby"

export default function LinksContainer({ pages }) {
    return (
        <ul className={linksContainerStyles.container}>
            {pages.map((pageName, index) => {
                const to = index === 0 ? "/" : "/" + pageName.toLowerCase() + "/";
                return (<li className={linksContainerStyles.listitem}><Link to={to}>{pageName}</Link></li>);
            })}
        </ul>
    )
}