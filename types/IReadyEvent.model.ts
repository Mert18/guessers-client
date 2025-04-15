export interface IReadyEvent {
    id: string;
    name: string;
    commenceTime: string;
    readyEventOptions: IReadyEventOption[];
    createdOn: string;
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
    odds: number;
}

interface IReadyEventLeague{
    key: string;
}