import React from "react"
import Layout from '../components/layout'
import { graphql, Link } from "gatsby"

import { rhythm } from "../utils/typography"
import { css } from "@emotion/core"

const LocalPosts = ({ data }) => {
  return (
    <div style={{ marginLeft: `5%` }}>
      <h3 style={{ color: `blue` }}>Local Markdown posts:</h3>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link
            to={node.fields.slug}
            css={css`text-decoration: none; color: inherit;`}
          >
            <h3 css={css`margin-bottom: ${rhythm(1 / 4)};`}>
              {node.frontmatter.title}{" "}
              <span css={css`color: #bbb;`}>
                — {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default function Home({ data }) {
  return (
    <div style={{ color: `purple` }}>
      <Layout headerText="Home page blat!">
        <h2>Here are all the blog posts:</h2>
        <LocalPosts data={data} />
        {/* <WpPosts /> */}
      </Layout>
    </div>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`