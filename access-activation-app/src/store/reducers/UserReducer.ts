import {LOGIN_USER, LOGOUT_USER} from '../actions/ActionTypes';

const INITIAL_STATE = {
    user: {}
}

export default function(state = INITIAL_STATE, action: any) {
    switch(action.type) {
        case LOGIN_USER: {
            const {user} = action.payload;
            return {
                ...state, 
                user
            };
        }
        case LOGOUT_USER: {
            const {user} = action.payload;
            return {
                ...state,
                user
            }
        }
        default: 
            return state;
    }
}