import type {WashItems} from "./washItems.ts";

export interface GenerateIsotainerInvoiceRequest {
    tankId : string; // guid
    companyId : string; // guid
    loadedOn : string;
    unloadedOn ?: string;
    lastInvoiceDate ?: string;
    washItems : Array<WashItems>;
}

