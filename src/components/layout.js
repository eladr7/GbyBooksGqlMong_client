import React from "react"
import layoutStyles from "./layout.module.css"
import LinksContainer from "./linksContainer"
import Header from './header'
import { useStaticQuery, graphql, Link } from "gatsby"
import SEO from "./seo"
import { getUser, isLoggedIn } from "../services/auth"

const LoginIntro = () => {
  return (
    <div>
      <h1>Hello {isLoggedIn() ? getUser().name : "world"}!</h1>
      <p>
        {isLoggedIn() ? (
          <>
            You are logged in, so check your{" "}
            <Link to="/app/profile">profile</Link>
          </>
        ) : (
            <>
              You should <Link to="/app/login">log in</Link> to see restricted
            content
          </>
          )}
      </p>
    </div>
  );
}

export default function Layout({ children, headerText, pageTitle, postExcerpt = null }) {
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

  const pages = ["Home", "About", "Contact", "my-files"]

  return (
    <div className={layoutStyles.layout}>
      <SEO title={pageTitle} description={postExcerpt} />
      <LoginIntro/>
      <LinksContainer pages={pages} />
      <Header headerText={headerText} />
      <h5>Subtitle from the GQL site meta-data: {data.site.siteMetadata.title}</h5>
      {children}
    </div>
  )
}

