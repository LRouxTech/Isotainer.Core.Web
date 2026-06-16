export interface WashTypeListResponse {
    washTypes : Array<WashTypeItem>
}

export interface WashTypeItem {
    washTypeId : string; // guid
    type : string;
    cost : number;
}