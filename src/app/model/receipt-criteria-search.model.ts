export class ReceiptCriteriaSearch {
  receiptType: string;
  ref: string;
  currentPage: number;
  pageSize: number;


  constructor(receiptType: string, ref: string, currentPage: number, pageSize: number) {
    this.receiptType = receiptType;
    this.ref = ref;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }
}
