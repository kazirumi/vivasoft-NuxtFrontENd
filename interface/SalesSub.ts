import type { Guid } from "guid-ts"

export interface SalesSub {
    Id: Guid | null,
    SalesMainId: Guid | null,
    ItemId: Guid | null,
    Quantity: number,
    TotalSubPrice: number
}