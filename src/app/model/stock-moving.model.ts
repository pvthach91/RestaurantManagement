import {StockItem} from "./stock-item.model";

export class StockMoving {
  id: number;
  stockRef: string;
  stockType: string;
  date: string;
  stockItems: Array<StockItem>;
  totalPrice: number;
  status: string;
  createdBy: string;
  accApprovedBy: string;


  constructor(id: number, stockRef: string, stockType: string, date: string, stockItems: Array<StockItem>, totalPrice: number, status: string, createdBy: string, accApprovedBy: string) {
    this.id = id;
    this.stockRef = stockRef;
    this.stockType = stockType;
    this.date = date;
    this.stockItems = stockItems;
    this.totalPrice = totalPrice;
    this.status = status;
    this.createdBy = createdBy;
    this.accApprovedBy = accApprovedBy;
  }
}
