export class ReceiptRequest {
  receiptType: string;
  ref: string;
  totalPrice: number;
  createdBy: string;


  constructor(receiptType: string, ref: string, totalPrice: number, createdBy: string) {
    this.receiptType = receiptType;
    this.ref = ref;
    this.totalPrice = totalPrice;
    this.createdBy = createdBy;
  }
}

