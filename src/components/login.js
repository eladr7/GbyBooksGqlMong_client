import React, { useContext, useState } from "react"
import { UserContext } from '../services/userContext';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { getUserQuery, addUserMutation } from './books/queries/queries';

import { navigate } from "gatsby"

import GoogleLogin from 'react-google-login';
const googleAppId = process.env.GOOGLE_APP_ID;

const addedUserHasIdField = userAdded => 
  (userAdded && userAdded.data && userAdded.data.addUser && userAdded.data.addUser.id);

const addUserToDB = async (user, addUser, userContext) => {
  const userAdded = await addUser({
    variables: {
      name: user.name,
      email: user.email
    }
  });

  if (addedUserHasIdField(userAdded)) {
    const userFromDB = { id: userAdded.data.addUser.id };
    userContext.setUserId(userFromDB);
  }
}

const Login = () => {
  const [addedCount, setAddedCount] = useState(0);

  const userContext = useContext(UserContext);
  const user = userContext.getUser();
  const [addUser] = useMutation(addUserMutation);

  const email = user ? user.email : "";
  const { loading, error, data } = useQuery(getUserQuery, { variables: { email } });
  if (error) return <p>Blat! couldn't get the user data to verify it</p>;

  const onSuccessLogin = () => res => {
    const { tokenId, profileObj: { name, email } } = res;
    const user = { name, email, token: tokenId };
    userContext.setSuccessfulLogin(user);
  }

  if (userContext.isLoggedIn()) {
    navigate(`/app/profile`)
  }
  else {
    if (data && data.user && data.user.id) userContext.setUserId({ id: data.user.id });
    else if (addedCount === 0) {
      if (!loading && user && data && !data.user) {
        setAddedCount(addedCount + 1);
        addUserToDB(user, addUser, userContext);
      }
    }
  }

  return (
    <div>
      <GoogleLogin
        className="loginbtn"
        clientId={googleAppId}
        buttonText="Login"
        onSuccess={onSuccessLogin()}
        onFailure={e => { console.error(e); }}
      >
        Continue with Google
    </GoogleLogin>
    </div>
  );
}

export default Login;