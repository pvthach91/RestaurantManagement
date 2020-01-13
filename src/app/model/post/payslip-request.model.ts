export class PayslipRequest {
  payslipType: string;
  ref: string;
  totalPrice: number;
  createdBy: string;


  constructor(payslipType: string, ref: string, totalPrice: number, createdBy: string) {
    this.payslipType = payslipType;
    this.ref = ref;
    this.totalPrice = totalPrice;
    this.createdBy = createdBy;
  }
}

