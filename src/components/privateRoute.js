import React, { useContext } from "react"
import { navigate } from "gatsby"
import { UserContext } from '../services/userContext';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const userContext = useContext(UserContext);

  // Elad: Implement a real OpenIdConnect login. compare to the check in TWIK
  if (!userContext.isLoggedIn() && location.pathname !== `/app/login`) {
    navigate("/app/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute