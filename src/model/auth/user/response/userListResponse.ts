export interface UserListResponse {
    users : Array<ListUser>;
    rows ?: number;
    page ?: number;
}

export interface ListUser {
    userId: string; // guid
    userName : string;
    email : string;
    roles : Array<string>; // guids
}