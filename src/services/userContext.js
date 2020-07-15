import React, { createContext, useReducer, useEffect } from 'react';
import { UserReducer, USER_OPS } from './userReducer';
import {setCookie, getCookie, eraseCookie} from './cookieManager';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, dispatch] = useReducer(UserReducer, [], () => {
        const userDataFromLocalStorage = localStorage.getItem('user');
        return userDataFromLocalStorage ? JSON.parse(userDataFromLocalStorage) : [];
    });

    useEffect(() => {
        if (user[0] && user[0].token) {
            localStorage.setItem('user', JSON.stringify(user));
            setCookie('token', user[0].token, 31);
            // if (user.token) Cookies.set('token', user.token, { expires: 31 });
        }
    }, [user]);

    const isLoggedIn = () => {
        return user[0] && user[0].id;
        // return Cookies.get('token') ? true : false;
    }

    const logout = (callback) => {
        eraseCookie('token');
        localStorage.removeItem('user');
        dispatch({
            type: USER_OPS.REMOVE_USER,
            user: user
        });
        callback();
    }

    const setSuccessfulLogin = (user) => {
        dispatch({
            type: USER_OPS.SET_USER_LOGIN_SUCCESS,
            user: user
        });
    }

    const setUserId = (user) => {
        dispatch({
            type: USER_OPS.SET_USER_ID,
            user: user
        });
    }

    const getUser = () => {
        return user[0];
    }

    return (
        <UserContext.Provider value={{
            user,
            dispatch,
            isLoggedIn: () => isLoggedIn(),
            logout: (callback) => logout(callback),
            setSuccessfulLogin: (user) => setSuccessfulLogin(user),
            setUserId: (user) => setUserId(user),
            getUser: () => getUser()
        }}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;