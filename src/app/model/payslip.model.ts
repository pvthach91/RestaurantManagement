export class Payslip {
  id: number;
  payslipType: string;
  ref: string;
  totalPrice: number;
  createdBy: string;
  dateCreated: string;


  constructor(id: number, payslipType: string, ref: string, totalPrice: number, createdBy: string, dateCreated: string) {
    this.id = id;
    this.payslipType = payslipType;
    this.ref = ref;
    this.totalPrice = totalPrice;
    this.createdBy = createdBy;
    this.dateCreated = dateCreated;
  }
}

