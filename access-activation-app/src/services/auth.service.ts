import {ajax} from './index';
import { IUser } from '../interfaces';

export const loginEmployee = (email: string, password: string) => {
    return ajax.post('/auth/login', {
        email,
        password
    })
}

export const registerEmployee = (employee: IUser) => {
    return ajax.post('/employee', employee)
}