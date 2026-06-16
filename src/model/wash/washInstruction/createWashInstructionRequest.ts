export interface CreateWashInstructionRequest {
    isotainerTankId : string; // guid
    washTypeId : string; // guid
    instructedOn : string;
}