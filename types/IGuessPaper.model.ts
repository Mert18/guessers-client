import { IEvent, IEventGuessOption, IEventGuessOptionCase } from "./IEvent.model";
import { IPaging } from "./IRequest.model";
import { IRoomBasic } from "./IRoom.model";
import { IUser } from "./IUser.model";

export interface ICreateGuessPaper {
  guesses: ICreateGuessPaperGuess[];
  stake: number;
  roomId: string;
}

export interface ICreateGuessPaperGuess {
  eventId: string;
  eventGuessOptionId: string;
  eventGuessOptionName: string;
  eventGuessOptionCaseId: string;
  eventGuessOptionCaseName: string;
  odd: number;
  signature: string;
}

export interface IListRoomGuessPapersByStatus {
  roomId: string;
  paging: IPaging;
}

export interface ISingleGuess {
  id: string;
  event: IEvent;
  eventGuessOption: IEventGuessOption;
  eventGuessOptionCase: IEventGuessOptionCase;
}

export interface IGuessPaper {
  id: string;
  user: IUser;
  room: IRoomBasic;
  guesses: ISingleGuess[];
  totalOdd: number;
  stake: number;
  wins: number;
  status: GuessPaperStatus;
  createdOn: Date;
}

export enum GuessPaperStatus {
  IN_PROGRESS = "IN_PROGRESS",
  WON = "WON",
  LOST = "LOST",
  CANCELLED = "CANCELLED",
}

export interface IHandleOptionSelected {
  event: IEvent;
  eventGuessOption: IEventGuessOption;
  eventGuessOptionCase: IEventGuessOptionCase;
}