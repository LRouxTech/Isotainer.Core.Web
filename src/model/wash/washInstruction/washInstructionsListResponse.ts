export interface WashInstructionsListResponse {

}

export interface WashInstructionItem {
    washInstructionsId : string; // guid
    isotainerTankId : string; // guid
    tankNumber : string;
    washTypeId : string; // guid
    wash : string;
    instructedOn : string;
}