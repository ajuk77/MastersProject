import { LOGIN_USER, LOGOUT_USER } from './ActionTypes';
import { IUser } from '../../interfaces';

export const loginUser = (user: IUser) => ({
    type: LOGIN_USER,
    payload: {
        user: user
    }
});

export const logoutUser = (user: IUser) => ({
    type: LOGOUT_USER,
    payload: {
        user: user
    }
})