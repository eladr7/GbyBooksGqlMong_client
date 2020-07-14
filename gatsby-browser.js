import "./src/styles/global.css"
import React from "react"
import UserContextProvider from "./src/services/userContext"

export const wrapRootElement = ({ element }) => {
  return <UserContextProvider>{element}</UserContextProvider>
}

// or:
// require('./src/styles/global.css')