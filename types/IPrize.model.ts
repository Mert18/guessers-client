import { IPaging } from "./IRequest.model";

export interface IGetRoomPrizes {
    roomId: string;
    paging: IPaging;
    active: boolean;
}

export interface ICreatePrize {
    createPrizeRequest: ICreatePrizeRequest;
    roomId: string;
}

interface ICreatePrizeRequest {
    name: string;
    description: string;
    value: number;
}

export interface IPrize {
    id: string;
    name: string;
    description: string;
    value: number;
    active: boolean;
    roomId: string;
}