import React, { useContext } from "react"
import { UserContext } from '../services/userContext';

const Profile = () => {
  const userContext = useContext(UserContext);
  const user = userContext.getUser();

  return (
    <>
      <h1>Your profile</h1>
      <ul>
        <li>Name: {user.name}</li>
        <li>E-mail: {user.email}</li>
      </ul>
    </>
  );
}

export default Profile