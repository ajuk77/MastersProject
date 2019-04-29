import {ajax} from './index';

export function generateId(id: number, email: string, token: string): Promise<any> {
    return ajax.post('/generateid', {
        email,
        id
    }, {
        headers: {
            'authorization': token
        }
    });
}

export function generateVisitorId(employeeId: number, email: string,
                                  firstName: string, lastName: string,
                                  contactNo: string, visitorEmail: string, token: string): Promise<any> {
    return ajax.post('/visitor', {
        employeeId,
        email,
        firstName,
        lastName,
        contactNo,
        visitorEmail
    }, {
        headers: {
            'authorization': token
        }
    });
}

export function getEmployeeId(id: number, jwt: string): Promise<any> {
    return ajax.get(`/access-id/${id}`, {
        headers: {
            'authorization': jwt
        }
    });
}

export function getVisitors(id: number, jwt: string): Promise<any> {
    return ajax.get(`/visitor/${id}`, {
        headers: {
            'authorization': jwt
        }
    })
}
