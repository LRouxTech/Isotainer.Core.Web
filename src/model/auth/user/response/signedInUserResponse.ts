export interface SignedInUserResponse {
    userId : string; // guid
    userName : string;
    email : string;
    tokenValue : string;
    tokenExpiresOn : string;
    roles : Array<string>; // guids
    permissions : Array<string>; // guids
}