import type {WashItems} from "./washItems.ts";

export interface IsotainerTankInvoiceResponse {
    tankId : string; // guid
    companyId : string; // guid
    invoiceDate : string;
    totalCost : number;
    washItems : Array<WashItems>
}