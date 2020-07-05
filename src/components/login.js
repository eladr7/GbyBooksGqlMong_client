import React, { useState } from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"

const Login = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = event => {
    event.preventDefault()
    handleLogin({ username: userName, password })
    navigate(`/app/profile`)
  }

  if (isLoggedIn()) {
    navigate(`/app/profile`)
  }
  
  // Elad: Implement a real OpenIdConnect login
  return (
    <>
      <h1>Log in</h1>
      <form method="post" onSubmit={event => { handleSubmit(event) }}>
        <label>
          Username
            <input type="text" onChange={e => setUsername(e.target.value)} required />
        </label>
        <label>
          Password
            <input type="password" onChange={e => setPassword(e.target.value)} required />
        </label>
        <input type="submit" value="Log In" />
      </form>
    </>
  );
}

export default Login;