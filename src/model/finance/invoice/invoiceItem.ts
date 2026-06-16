import type {InvoiceLineItem} from "../invoiceLine/invoiceLineItem.ts";

export interface InvoiceItem {
    isotainerTankId : string; // guid
    companyId : string; // guid
    totalCost : number;
    xeroId : string;
    invoiceLineItems : Array<InvoiceLineItem>;
}