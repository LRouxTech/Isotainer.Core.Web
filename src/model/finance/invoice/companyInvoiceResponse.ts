import type {InvoiceItem} from "./invoiceItem.ts";

export interface CompanyInvoiceResponse {
    invoiceItems : Array<InvoiceItem>
}