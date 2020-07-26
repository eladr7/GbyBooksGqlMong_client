import React from 'react'
import { Layout, Divider } from 'antd'


import useSiteMetadata from './use-site-metadata'
import LoginIntro from './LoginIntro'
import LinksContainer from "./linksContainer"
import Header from './header'

import Author from './Author'
import Contacts from './Contacts'
import Menu from './Menu'


const { Sider } = Layout

const Sidebar = ({ hideMobile, pages, headerText }) => {
  const { author, menu } = useSiteMetadata()

  return (
    <Sider className={`text-white no-print ${hideMobile && 'hide-mobile'}`}>
      <LoginIntro />

      <Header headerText={headerText} />

      <Author author={author} />
      <Contacts contacts={author.contacts} />
      <Divider className="sidebar-divider" />
      <Menu menu={menu} />
      <div className="hide-mobile">
        <LinksContainer pages={pages} />
      </div>
    </Sider>
  )
}

export default Sidebar
