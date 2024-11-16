import { IRoomBasic } from "./IRoom.model";

export interface IUserRegister {
    username: string;
    password: string;
}


export interface IPendingInvite {
    id: string;
    room: IRoomBasic;
}

export interface IUser {
    id: string;
    username: string;
    luck: number;
    createdOn: Date;
}