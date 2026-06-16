export interface CreateUserRequest {
    name : string;
    surname : string;
    userName : string;
    email : string;
    roles : Array<string>; // guids
    permissions : Array<string>; // guids
}