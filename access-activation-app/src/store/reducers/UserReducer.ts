import {LOGIN_USER, LOGOUT_USER} from '../actions/ActionTypes';

const INITIAL_STATE = {
    accessToken: '',
    user: {}
}

export default function(state = INITIAL_STATE, action: any) {
    switch(action.type) {
        case LOGIN_USER.type: {
            const {user, accessToken} = action.payload;
            return {
                ...state,
                accessToken,
                user
            };
        }
        case LOGOUT_USER.type: {
            const {user, accessToken} = action.payload;
            return {
                ...state,
                accessToken,
                user
            }
        }
        default: 
            return state;
    }
}