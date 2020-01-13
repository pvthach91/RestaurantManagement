export class Receipt {
  id: number;
  receiptType: string;
  ref: string;
  totalPrice: number;
  createdBy: string;
  dateCreated: string;


  constructor(id: number, receiptType: string, ref: string, totalPrice: number, createdBy: string, dateCreated: string) {
    this.id = id;
    this.receiptType = receiptType;
    this.ref = ref;
    this.totalPrice = totalPrice;
    this.createdBy = createdBy;
    this.dateCreated = dateCreated;
  }
}

