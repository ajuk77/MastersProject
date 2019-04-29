import axios from 'axios';
import { config } from '../config';
import { loginEmployee } from './auth.service';

export const ajax = axios.create({
    baseURL: config.url,
    headers: {
        'content-type': 'application/json'
    }
})

// Export services from other modules.

export {loginEmployee};