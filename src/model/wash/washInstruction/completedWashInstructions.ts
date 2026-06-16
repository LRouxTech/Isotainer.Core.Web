export interface CompletedWashInstructions {
    washInstructionId: string; // guid
    isotainerTankId: string; // guid
    wash: string;
    cost: number;
    washedOn : string;
}