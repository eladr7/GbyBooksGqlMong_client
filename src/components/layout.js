import React, { useContext } from "react"
import layoutStyles from "./cssModules/layout.module.css"
import LinksContainer from "./layoutComps/linksContainer"
import Header from './layoutComps/header'
import { useStaticQuery, graphql, Link } from "gatsby"
import SEO from "./layoutComps/seo"
import { UserContext } from '../services/userContext';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// const client = new ApolloClient({
//   uri: 'https://gatsby-server-ugdhobbyma-uw.a.run.app/graphql'
// });
const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql'
});

const LoginIntro = () => {
  const userContext = useContext(UserContext);

  return (
    <div>
      <h1>Hello {userContext.isLoggedIn() ? userContext.getUser().name : "world"}!</h1>
      <p>
        {userContext.isLoggedIn() ? (
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

  const pages = ["Home", "About", "Contact", "my-files", "Books"]

  return (
    <div className={layoutStyles.layout}>
      <SEO title={pageTitle} description={postExcerpt} />
      <LoginIntro />
      <LinksContainer pages={pages} />
      <Header headerText={headerText} />
      <h5>Subtitle from the GQL site meta-data: {data.site.siteMetadata.title}</h5>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
    </div>
  )
}

