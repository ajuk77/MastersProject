import {ajax} from './index';

export function validateId(uuid: string, token: string){
//validateemployee
    return ajax.post('/validateemployee', {
        uuid
    }, {
        headers: {
            'authorization': token
        }
    });

}
export function validateVisitorId(uuid: string, token: string){
//validatepass
    return ajax.post('/validatepass', {
        uuid
    }, {
        headers: {
            'authorization': token
        }
    });
}
