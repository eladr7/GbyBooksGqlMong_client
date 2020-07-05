import React from "react"
import Layout from '../components/layout'
import { graphql, Link } from "gatsby"
import { rhythm } from "../utils/typography"
import { css } from "@emotion/core"


const getLink = (node, slug, title, date) => {
  return (
    <Link
      to={slug}
      css={css`text-decoration: none; color: inherit;`}
    >
      <h3 css={css`margin-bottom: ${rhythm(1 / 4)};`}>
        {title}{" "}
        <span css={css`color: #bbb;`}>
          — {date}
        </span>
      </h3>
      <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
    </Link>
  );
}

const blogPostLink = (blogType, posts, color, blogsTitle) => {
  return (
    <div style={{ marginLeft: `5%` }}>
      <h3 style={{ color: `${color}` }}>{blogsTitle}</h3>
      <h4>{posts.totalCount} Posts</h4>
      {posts.edges.map(({ node }) => (
        <div key={node.id}>
          {blogType === "wp" ? getLink(node, node.slug, node.title, node.date) : getLink(node, node.fields.slug, node.frontmatter.title, node.frontmatter.date)}
        </div>
      ))}
    </div>
  );
}

const LocalPosts = ({ data }) =>
  blogPostLink("md", data.allMarkdownRemark, 'blue', 'Local Markdown posts:')

const WpPosts = ({ data }) =>
  blogPostLink("wp", data.allWordpressPost, 'red', 'My WordPress Posts:')


export default function Home({ data }) {
  return (
    <div style={{ color: `purple` }}>
      <Layout headerText="Home page blat!" pageTitle="My site title">
        <h2>Here are all the blog posts:</h2>
        <LocalPosts data={data} />
        <WpPosts data={data} />
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
    allWordpressPost(sort: { fields: [date] }) {
      edges {
        node {
          title
          excerpt
          slug
        }
      }
    }
  }
`