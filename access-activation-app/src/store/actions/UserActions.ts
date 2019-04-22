import { LOGIN_USER, LOGOUT_USER } from './ActionTypes';
import { IUserInfo } from '../../interfaces';


export const loginUser = (payload: IUserInfo) => {
    return { 
        type: LOGIN_USER.type,
        payload: {
            accessToken: payload.accessToken,
            user: payload.user
        }
    }
};

export const logoutUser = (payload: IUserInfo) => ({
    type: LOGOUT_USER.type,
    payload: {
        accessToken: payload.accessToken,
        user: payload.user
    }
})