export interface IUser {
    id?: number;
    firstName: string;
    lastName: string;
    contactNo: string;
    email: string;
    password?: string;
}

export interface IUserInfo {
    accessToken: string;
    user: IUser
}