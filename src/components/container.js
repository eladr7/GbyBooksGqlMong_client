import React from "react"
import { Link } from "gatsby"

import containerStyles from "./container.module.css"

export default function Container({ children }) {
    return (
        <div className={containerStyles.container}>
            <Link to="/">Home</Link>
            {children}
        </div>)
}