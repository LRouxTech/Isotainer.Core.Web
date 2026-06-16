export interface UpdateUserRequest {
    userId : string; // guid
    userName : string;
    name : string;
    surname : string;
    email : string;
    roles : Array<string>; // guids
    permissions : Array<string>; // guids
}