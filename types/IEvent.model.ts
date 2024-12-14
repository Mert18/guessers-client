import { IPaging } from "./IRequest.model";

export interface IGetActiveEvents {
  roomId: string;
  paging: IPaging;
}

export interface IGetCompletedEvents {
  roomId: string;
  paging: IPaging;
}

export interface ICreateEvent {
  event: ICreateEventEvent;
  roomId: string;
}

interface ICreateEventEvent {
    name: string;
    description: string;
    eventGuessOptions: IEventGuessOption[];
}

export interface IEventGuessOption {
    id?: string;
    name: string;
    eventGuessOptionCases: IEventGuessOptionCase[];
    precedence: number;
}

export interface IEventGuessOptionCase {
    id?: string;
    name: string;
    odds: number;
    status?: string;
}

export interface ICreateEventFromReadyEvent {
    roomId: string;
    readyEventIds: string[];
}

export interface IStartEvent {
    eventId: string;
    roomId: string;
}

export interface IFinalizeEvent {
    request: IFinalizeEventRequest;
    eventId: string;
    roomId: string;
}

export interface IFinalizeEventRequest {
    winnerEventGuessOptionCases: (string | undefined)[];
}

export interface IEvent {
    id: string;
    name: string;
    description: string;
    createdOn: Date;
    eventGuessOptions: IEventGuessOption[];
    status: string;
    eventTime: Date;
}