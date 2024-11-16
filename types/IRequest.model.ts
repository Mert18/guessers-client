export interface IPaging {
    page: number;
    size: number;
    totalPages?: number;
    totalElements?: number;
    active?: boolean;
}