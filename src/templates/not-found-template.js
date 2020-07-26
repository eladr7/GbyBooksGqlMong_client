import React from 'react'
import Sidebar from '../components/layoutComps/Sidebar'
import Layout from '../components/layout.js'
import  useSiteMetadata  from '../components/layoutComps/use-site-metadata'

const NotFoundTemplate = () => {
  const { title, subtitle, keywords } = useSiteMetadata()

  return (
    <Layout title={`Not Found - ${title}`} description={subtitle} keywords={keywords}>
      <Sidebar />
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundTemplate
