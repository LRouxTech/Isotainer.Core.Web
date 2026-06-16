import type {InvoiceItem} from "./invoiceItem.ts";

export interface InvoiceLineItem {
    invoiceItems : Array<InvoiceItem>;
}