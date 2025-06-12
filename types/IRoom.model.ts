import { IPaging } from "./IRequest.model";
import { IUser } from "./IUser.model";

export interface ICreateRoom {
  name: string;
  publico: boolean;
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
    public: boolean;
    owner: IUser;
    memberCount?: number;
}

export interface IRoomUser {
    id: string;
    user: IUser;
    room: IRoomBasic;
    owner: boolean;
    score: number;
    memberCount: number;
}

export interface ISelfRoomCardProps {
  roomUser: IRoomUser;
}