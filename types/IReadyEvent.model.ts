export interface IReadyEvent {
    id: string;
    name: string;
    commenceTime: Date;
    readyEventOptions: IReadyEventOption[];
    createdOn: Date;
    league: IReadyEventLeague;
}

interface IReadyEventOption {
    id: string;
    name: string;
    readyEventOptionCases: IReadyEventOptionCase[];   
}

interface IReadyEventOptionCase{
    id: string;
    name: string;
}

interface IReadyEventLeague{
    key: string;
}