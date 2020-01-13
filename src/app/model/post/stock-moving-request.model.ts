import {StockItemRequest} from "./stock-item-request.model";

export class StockMovingRequest {
  createdBy: string;
  accApprovedBy: string;
  stockItems: Array<StockItemRequest>;
  totalPrice: number;


  constructor(createdBy: string, accApprovedBy: string, stockItems: Array<StockItemRequest>, totalPrice: number) {
    this.createdBy = createdBy;
    this.accApprovedBy = accApprovedBy;
    this.stockItems = stockItems;
    this.totalPrice = totalPrice;
  }
}
