import { IPaging } from "./IRequest.model";
import { IUser } from "./IUser.model";

export interface ICreateRoom {
  name: string;
  publico: boolean;
  borderless: boolean;
}

export interface IInvitePeople {
    invitedUsername: string;
    roomId: string;
}

export interface ISearchRoom {
    query: string;
    paging: IPaging;
}

export interface IGiveTokenToUser {
    roomId: string;
    roomUserIds: string[];
    amount: number;
}

export interface IRoomBasic {
    id: string;
    name: string;
    isPublic: boolean;
    isBorderless: boolean;
    owner: IUser;
    memberCount?: number;
}

export interface IRoomUser {
    id: string;
    user: IUser;
    room: IRoomBasic;
    balance: number;
    isOwner: boolean;
    score: number;
    memberCount: number;
}