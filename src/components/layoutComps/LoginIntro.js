import React, { useContext } from "react"

import { UserContext } from '../../services/userContext';
import { Link } from "gatsby"

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
  export default LoginIntro