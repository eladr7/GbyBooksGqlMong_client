import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const FilesTable = ({data}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>relativePath</th>
                    <th>prettySize</th>
                    <th>extension</th>
                    <th>birthTime</th>
                </tr>
            </thead>
            <tbody>
                {data.allFile.edges.map(({ node }, index) => (
                    <tr key={index}>
                        <td>{node.relativePath}</td>
                        <td>{node.prettySize}</td>
                        <td>{node.extension}</td>
                        <td>{node.birthTime}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default function MyFiles({ data }) {
    console.log(data)
    return (
        <Layout headerText="My Site's Files">
            <div>Here are the static files of our site: (you suka)</div>
            <FilesTable data={data}/>
        </Layout>
    )
}

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`