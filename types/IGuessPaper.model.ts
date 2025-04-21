import { IEvent, IEventGuessOption, IEventGuessOptionCase } from "./IEvent.model";
import { IPaging } from "./IRequest.model";
import { IRoomBasic } from "./IRoom.model";
import { IUser } from "./IUser.model";

export interface ICreateGuessPaper {
  guesses: ICreateGuessPaperGuess[];
  roomId: string;
}

export interface ICreateGuessPaperGuess {
  eventId: string;
  eventName: string;
  eventGuessOptionId: string;
  eventGuessOptionName: string;
  eventGuessOptionCaseId: string;
  eventGuessOptionCaseName: string;
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
  status: GuessPaperStatus;
  createdOn: Date;
}

enum GuessPaperStatus {
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