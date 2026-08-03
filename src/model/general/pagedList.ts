export interface PagedRequest {
    pageIndex: number;
    pageSize: number;
    search: string | undefined;
}

export interface PagedList<T> {
    items: T[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}