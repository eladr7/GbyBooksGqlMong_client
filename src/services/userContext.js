import React, { createContext, useReducer, useEffect } from 'react';
import { UserReducer, USER_OPS } from './userReducer';


// import Cookies from 'js-cookie';
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, dispatch] = useReducer(UserReducer, [], () => {
        const userDataFromLocalStorage = localStorage.getItem('user');
        return userDataFromLocalStorage ? JSON.parse(userDataFromLocalStorage) : [];
    });

    useEffect(() => {
        debugger
        if (user[0] && user[0].token) {
            localStorage.setItem('user', JSON.stringify(user[0]));
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