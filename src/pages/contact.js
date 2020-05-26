import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"
import SEO from "../components/seo"

export default function Contact() {
    return (
        <div style={{ color: `teal` }}>
            <SEO title="My Amazing Gatsby App" />
            <Link to="/">Home</Link>
            <Header headerText="Contact" />
            <p>Send us a message!</p>
        </div>
    )
}