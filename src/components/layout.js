import React, { useContext } from "react"
// import layoutStyles from "./cssModules/layout.module.css"
import '../assets/css/init.css'

import AntLayoutWrapper from "./layoutComps/antLayoutWrapper"
import SideBar from "./layoutComps/Sidebar"
import { useStaticQuery, graphql } from "gatsby"
import SEO from "./layoutComps/seo"

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// const client = new ApolloClient({
//   uri: 'https://gatsby-server-ugdhobbyma-uw.a.run.app/graphql'
// });
const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql'
});


export default function Layout({ children, headerText, pageTitle, postExcerpt = null }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            keywords
          }
        }
      }
    `
  )

  const pages = ["Home", "About", "Contact", "my-files", "Books"]

  return (
    <AntLayoutWrapper
      title={`${pageTitle} - ${data.site.siteMetadata.title}`}
      description={postExcerpt}
      keywords={data.site.siteMetadata.keywords}
      article={{
        title: pageTitle,
        description: "cool"
      }}
    >
    <div className="d-f">

      <SideBar hideMobile={true} pages={pages} headerText={headerText}/>
      <SEO title={pageTitle} description={postExcerpt} />
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
      </div>

    </AntLayoutWrapper>
  )
}

