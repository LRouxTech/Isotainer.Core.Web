export interface UpdateUserRequest {
    userId : string; // guid
    userName : string;
    name : string;
    surname : string;
    email : string;
    roleIds : Array<string>; // guids
    permissionIds : Array<string>; // guids
}