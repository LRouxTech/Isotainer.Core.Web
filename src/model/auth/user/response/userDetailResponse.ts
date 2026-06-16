export interface UserDetailResponse {
    userId : string; // guid
    userName : string;
    email : string;
    roles : Array<string>; // guids
    permissions : Array<string>; // guids
}