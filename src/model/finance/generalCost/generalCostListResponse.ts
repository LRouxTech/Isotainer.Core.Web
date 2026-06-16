export interface GeneralCostListResponse {
    generalCosts : Array<GeneralCostItem>
}

export interface GeneralCostItem{
    generalCostId : string; // guid
    name : string;
    cost : number;
}