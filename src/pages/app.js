import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"
import Login from "../components/login"
// import UserContextProvider from '../services/userContext'

const App = () => (
  <Layout>
    {/* <UserContextProvider> */}
      <Router>
        <PrivateRoute path="/app/profile" component={Profile} />
        <Login path="/app/login" />
      </Router>
    {/* </UserContextProvider> */}
  </Layout>
)

export default App