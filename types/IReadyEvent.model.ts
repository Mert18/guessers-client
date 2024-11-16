export interface IReadyEvent {
    id: string;
    name: string;
    commenceTime: Date;
    readyEventOptions: IReadyEventOption[];
    createdOn: Date;
    league: IReadyEventLeague;
}

export interface IReadyEventOption {
    id: string;
    name: string;
    readyEventOptionCases: IReadyEventOptionCase[];   
}

export interface IReadyEventOptionCase{
    id: string;
    name: string;
    odds: number;
}

export interface IReadyEventLeague{
    key: string;
}