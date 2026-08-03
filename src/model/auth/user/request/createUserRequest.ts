export interface CreateUserRequest {
    name : string;
    surname : string;
    userName : string;
    email : string;
    roleIds : Array<string>; // guids
    permissionIds : Array<string>; // guids
}