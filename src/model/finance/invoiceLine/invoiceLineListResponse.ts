import type {InvoiceLineItem} from "./invoiceLineItem.ts";

export interface InvoiceLineListResponse {
    invoiceLines : Array<InvoiceLineItem>
}