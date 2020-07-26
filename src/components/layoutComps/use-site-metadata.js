import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            author {
              name
              bio
              photo
              contacts {
                facebook
                telegram
                twitter
                linkedin
                instagram
                github
                email
              }
            }
            menu {
              label
              path
            }
            siteUrl
            title
            subtitle
            copyright
            keywords
          }
        }
      }
    `
  )

  return site.siteMetadata
}

export default useSiteMetadata
