import React from "react"
import layoutStyles from "./layout.module.css"
import LinksContainer from "./linksContainer"
import Header from './header'
import { useStaticQuery, graphql } from "gatsby"

export default function Layout({ children, headerText }) {
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
      <LinksContainer pages={pages} />
      <Header headerText={headerText} />
      <h5>Subtitle from the GQL site meta-data: {data.site.siteMetadata.title}</h5>
      {children}
    </div>
  )
}

