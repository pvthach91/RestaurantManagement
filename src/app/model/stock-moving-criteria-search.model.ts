export class StockMovingCriteriaSearch {
  stockRef: string;
  status: string;
  currentPage: number;
  pageSize: number;


  constructor(stockRef: string, status: string, currentPage: number, pageSize: number) {
    this.stockRef = stockRef;
    this.status = status;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }
}
