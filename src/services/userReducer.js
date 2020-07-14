import { v4 as uuidv4 } from 'uuid';

export const USER_OPS = {
    SET_USER_LOGIN_SUCCESS: "SET_USER_LOGIN_SUCCESS",
    SET_USER_ID: "SET_USER_ID",
    REMOVE_USER: "REMOVE_USER",
}

export const UserReducer = (state, action) => {
    switch (action.type) {
        case USER_OPS.SET_USER_LOGIN_SUCCESS:
            return [{
                name: action.user.name,
                email: action.user.email,
                id: (state[0] && state[0].id) ? state[0].id : (action.user.id ? action.user.id : null),
                token: (state[0] && state[0].token) ? state[0].token : action.user.token
            }];
        case USER_OPS.SET_USER_ID:
            return [{
                name: state[0].name,
                email: state[0].email,
                token: state[0].token,
                id: action.user.id
            }];
        case USER_OPS.REMOVE_USER:
            return [];
        default:
            return state[0];
    }
}