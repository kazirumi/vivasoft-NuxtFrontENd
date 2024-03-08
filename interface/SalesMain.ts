import type { Guid } from "guid-ts";
import type { SalesSub } from "./SalesSub";

export interface SalesMain {
    Id: Guid | null,
    SalesDate: Date,
    TotalAmount: number,
    SalesSubs: SalesSub[]
}