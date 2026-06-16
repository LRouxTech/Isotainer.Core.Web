export interface WashStatusListResponse {
    items : Array<WashStatusItem>
}

export interface WashStatusItem {
    washStatusId : string; // guid
    name : string;
}