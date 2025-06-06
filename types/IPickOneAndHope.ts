export interface IGameRoom {
    id: string;
    createdAt: Date;
    status: string;
    players: IGameRoomPlayer[];
}

export interface IGameRoomPlayer {
    object: string;
    username: string;
    sessionId: string;
}